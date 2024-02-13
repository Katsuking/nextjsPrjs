import * as z from "zod";

export const FormSchema = z.object({
  name: z.string().min(1, { message: "Sever name is required!" }),
  imageUrl: z.string().min(1, { message: "Server image is required" }),
});
