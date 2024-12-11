import { z } from 'zod'

export const productsFilterSchema = z.object({
  query: z.string().optional(),
  isNew: z.enum(['all', 'true', 'false']).optional(),
  acceptTrade: z.boolean().optional(),
  paymentMethods: z
    .array(z.enum(['pix', 'card', 'boleto', 'cash', 'deposit']))
    .optional(),
})

export type ProductsFilterSchema = z.infer<typeof productsFilterSchema>
