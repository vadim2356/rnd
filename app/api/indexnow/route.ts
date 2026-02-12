import { NextResponse } from "next/server";
import { getSitemapUrlList } from "@/app/sitemap";
import { SITE_URL } from "@/lib/seo";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * GET /api/indexnow — отправляет список URL сайта в IndexNow (Bing, Yandex и др.).
 * Вызывайте после деплоя или по крону. Опционально: ?key=SECRET для защиты (если задан INDEXNOW_SECRET).
 */
export async function GET(request: Request) {
  const key = process.env.INDEXNOW_KEY || "ultdpznmtuj";
  const secret = process.env.INDEXNOW_SECRET;
  if (secret) {
    const url = new URL(request.url);
    if (url.searchParams.get("key") !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const base = SITE_URL;
  let host: string;
  try {
    host = new URL(base).host;
  } catch {
    return NextResponse.json({ error: "Invalid SITE_URL" }, { status: 500 });
  }

  const keyLocation = `${base}/indexnow-key.txt`;
  const urlList = getSitemapUrlList();

  const body = {
    host,
    key,
    keyLocation,
    urlList,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      return NextResponse.json(
        { error: "IndexNow request failed", status: res.status, body: text },
        { status: 502 }
      );
    }
    return NextResponse.json({
      ok: true,
      submitted: urlList.length,
      message: "IndexNow notified successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "IndexNow request failed", details: String(err) },
      { status: 502 }
    );
  }
}
