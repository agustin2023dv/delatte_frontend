// src/integrations/utils/uploadToCloudinary.ts

export const uploadToCloudinary = async (
  file: File,
  options: {
    timestamp: number;
    signature: string;
    folder?: string;
  }
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY!);
  formData.append("timestamp", options.timestamp.toString());
  formData.append("signature", options.signature);
  formData.append("folder", options.folder || "");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir la imagen a Cloudinary");
  }

  return response.json();
};