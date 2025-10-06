import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatCurrency(
  amount: number,
  locale: string = "en-US",
  currency: string = "USD",
): string {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}
export async function uploadImageToCloudinary(
  file: File,
  folder: string,
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // 👇 Thêm folder vào để Cloudinary tự nhóm ảnh
  formData.append("folder", `e-education/${folder}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();
  if (!response.ok) {
    console.error("❌ Upload failed:", data);
    throw new Error(data.error?.message || "Upload failed");
  }

  console.log("✅ Uploaded to Cloudinary:", data.secure_url);
  return data.secure_url as string;
}
