import { z } from 'zod'

export const productFormSchema = z.object({
  name: z.string().min(1, 'Informe o título do anúncio.'),
  description: z.string().min(1, 'Informe a descrição do anúncio.'),
  isNew: z.coerce.boolean().default(true),
  acceptTrade: z.coerce.boolean().default(false),
  price: z.coerce
    .number({ message: 'Informe um valor.' })
    .transform((value) => Math.round(value * 100))
    .refine((value) => value >= 100, 'Informe o valor mínimo de R$ 1,00.'),
  paymentMethods: z.array(z.string()).min(1, 'Selecione ao menos um método.'),
})

export type ProductFormSchema = z.infer<typeof productFormSchema>
