import { z } from 'zod'

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Informe um nome.')
      .refine(
        (value) => value.trim().split(' ').length > 1,
        'Informe o nome completo.',
      ),
    phone: z.string().min(1, 'Informe um telefone.'),
    email: z
      .string()
      .min(1, 'Informe um e-mail.')
      .email('Informe um e-mail válido'),
    password: z
      .string()
      .min(1, 'Informe uma senha.')
      .min(6, 'Informe uma senha com ao menos 6 dígitos.'),
    confirm_password: z.string().min(1, 'Informe a confirmação da senha.'),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não são iguais.',
        path: ['confirm_password'],
      })
    }
  })

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>
