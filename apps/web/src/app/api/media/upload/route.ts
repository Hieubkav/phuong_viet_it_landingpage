import { NextResponse } from "next/server";
import sharp from "sharp";
import { api } from "@pv-erp/backend/convex/_generated/api";
import { getConvexServerClient } from "@/lib/convexServerClient";

export const runtime = "nodejs";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = typeof formData.get("title") === "string" ? String(formData.get("title")) : undefined;

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, message: "Thiếu file cần tải lên" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, message: "Định dạng không hợp lệ" }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json({ ok: false, message: "Ảnh vượt quá dung lượng cho phép (10MB)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { data: webpBuffer, info } = await sharp(buffer)
      .rotate()
      .webp({ quality: 90 })
      .toBuffer({ resolveWithObject: true });
    const webpArray = new Uint8Array(webpBuffer);

    const client = getConvexServerClient();
    const { uploadUrl } = await client.action(api.media.generateUploadUrl, {});

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "image/webp" },
      body: webpArray,
    });

    if (!uploadResponse.ok) {
      const message = await uploadResponse.text();
      throw new Error(message || "Không thể upload lên storage");
    }

    const uploadResult = await uploadResponse.json().catch(() => ({}));
    const storageId = typeof uploadResult.storageId === "string" ? uploadResult.storageId : undefined;
    if (!storageId) {
      throw new Error("Không nhận được storageId từ Convex");
    }

    const media = await client.mutation(api.media.saveImage, {
      storageId,
      title: title?.trim() || undefined,
      width: info.width ?? undefined,
      height: info.height ?? undefined,
      format: "webp",
      sizeBytes: info.size ?? webpBuffer.length,
    });

    return NextResponse.json({ ok: true, media });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể xử lý upload";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
