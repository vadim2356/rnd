import { NextRequest, NextResponse } from "next/server";

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

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[LEAD ERROR]", e);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
