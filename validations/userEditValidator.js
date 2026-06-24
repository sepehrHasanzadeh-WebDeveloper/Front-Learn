import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام نمی‌تواند بیش از ۵۰ کاراکتر باشد")
    .optional(),

  email: z.string().email("ایمیل معتبر نیست").optional(),

  role: z
    .enum(["user", "admin"], {
      errorMap: () => ({
        message: "نقش کاربری باید یکی از user یا admin باشد",
      }),
    })
    .optional(),
});
