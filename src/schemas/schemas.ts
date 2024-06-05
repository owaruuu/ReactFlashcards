import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, "El campo de email es necesario.")
        .email("Por favor ingresa un email valido."),
    password: z.string().min(1, "El campo de password es necesario."),
});

export const signupFormSchema = z
    .object({
        email: z
            .string()
            .min(1, "El campo de email es necesario.")
            .email("Por favor ingresa un email valido."),
        password: z
            .string()
            .min(8, "El password debe tener al menos 8 caracteres.")
            .max(20, "El password no puede exceder los 20 caracteres."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Los passwords no coinciden",
        path: ["confirmPassword"],
    })
    .refine((data) => {
        const hasNumber = /\d/.test(data.password);
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(
            data.password
        );
        const hasUppercase = /[A-Z]/.test(data.password);
        const hasLowercase = /[a-z]/.test(data.password);

        return hasNumber && hasSpecialCharacter && hasUppercase && hasLowercase;
    }, "El password debe tener al menos 1 numero, 1 caracter especial, 1 letras mayuscula y 1 letra minuscula.");
