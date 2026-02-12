import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { business } from "@/data/business";

const BITRIX24_WEBHOOK_URL =
  process.env.BITRIX24_WEBHOOK_URL ||
  "https://b24-4qipwt.bitrix24.ru/rest/14/7xu7dr06l5fc6dwn/crm.lead.add.json";

const LEAD_EMAIL = business.email;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
    }

    const { name, phone, city, source, comment, contactVia } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, message: "Name and phone are required" },
        { status: 400 }
      );
    }

    const payload = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      city: city ? String(city).trim() : undefined,
      source: source ? String(source).trim() : undefined,
      comment: comment ? String(comment).trim() : undefined,
      contactVia: contactVia ? String(contactVia).trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    console.log("[LEAD]", JSON.stringify(payload, null, 2));

    const referer =
      request.headers.get("referer") || request.headers.get("origin") || "Не определено";

    // Отправка лида в Bitrix24
    const commentsParts = [
      `Имя: ${payload.name}`,
      `Телефон: ${payload.phone}`,
      payload.city ? `Город: ${payload.city}` : null,
      payload.source ? `Источник: ${payload.source}` : null,
      payload.comment ? `Комментарий: ${payload.comment}` : null,
      payload.contactVia ? `Способ связи: ${payload.contactVia}` : null,
      `Страница отправки: ${referer}`,
    ].filter(Boolean);

    const bitrixFields = {
      TITLE: `Заявка с сайта — ${business.brandName}`,
      NAME: payload.name,
      PHONE: [{ VALUE: payload.phone, VALUE_TYPE: "WORK" }],
      SOURCE_ID: "WEB",
      COMMENTS: commentsParts.join("\n"),
    };

    const formBody = new URLSearchParams();
    formBody.append("fields[TITLE]", bitrixFields.TITLE);
    formBody.append("fields[NAME]", bitrixFields.NAME);
    formBody.append("fields[PHONE][0][VALUE]", bitrixFields.PHONE[0].VALUE);
    formBody.append("fields[PHONE][0][VALUE_TYPE]", bitrixFields.PHONE[0].VALUE_TYPE);
    formBody.append("fields[SOURCE_ID]", bitrixFields.SOURCE_ID);
    formBody.append("fields[COMMENTS]", bitrixFields.COMMENTS);
    formBody.append("params[REGISTER_SONET_EVENT]", "Y");

    try {
      const bitrixRes = await fetch(BITRIX24_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody.toString(),
      });
      const bitrixData = await bitrixRes.text();
      if (!bitrixRes.ok) {
        console.error("[LEAD] Bitrix24 error:", bitrixRes.status, bitrixData);
      }
    } catch (err) {
      console.error("[LEAD] Bitrix24 fetch error:", err);
    }

    // Отправка заявки на почту DukatSnab26@yandex.ru (Yandex SMTP)
    if (LEAD_EMAIL && MAIL_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.yandex.ru",
          port: 465,
          secure: true,
          auth: {
            user: LEAD_EMAIL,
            pass: MAIL_PASSWORD,
          },
        });
        const mailText = [
          `Новая заявка с сайта — ${business.brandName}`,
          "",
          `Имя: ${payload.name}`,
          `Телефон: ${payload.phone}`,
          payload.city ? `Город: ${payload.city}` : null,
          payload.source ? `Источник: ${payload.source}` : null,
          payload.comment ? `Комментарий: ${payload.comment}` : null,
          payload.contactVia ? `Способ связи: ${payload.contactVia}` : null,
          `Страница: ${referer}`,
          `Дата: ${payload.createdAt}`,
        ]
          .filter(Boolean)
          .join("\n");
        await transporter.sendMail({
          from: `"${business.brandName}" <${LEAD_EMAIL}>`,
          to: LEAD_EMAIL,
          subject: `Заявка с сайта: ${payload.name}, ${payload.phone}`,
          text: mailText,
        });
      } catch (mailErr) {
        console.error("[LEAD] Email send error:", mailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[LEAD ERROR]", e);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
