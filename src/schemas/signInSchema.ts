import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Informe um e-mail.')
    .email('Informe um e-mail válido'),
  password: z.string().min(1, 'Informe uma senha.'),
})

export type SignInFormSchema = z.infer<typeof signInFormSchema>
