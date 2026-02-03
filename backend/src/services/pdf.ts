import fs from "fs/promises";

export const extractPdfText = async (filePath: string) => {
  const fileBuffer = await fs.readFile(filePath);
  const text = fileBuffer.toString("utf8");
  return text.slice(0, 12000);
};
