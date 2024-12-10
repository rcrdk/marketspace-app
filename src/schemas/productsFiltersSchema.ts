import { z } from 'zod'

export const productsFilterSchema = z.object({
  query: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  isNew: z
    .enum(['all', 'true', 'false'])
    .default('all')
    .transform((value) => {
      if (value === 'all') return undefined
      if (value === 'true') return true
      if (value === 'false') return false
    }),
  acceptTrade: z.boolean().optional(),
  paymentMethods: z.array(z.enum(['pix', 'card', 'boleto', 'cash', 'deposit'])),
})

export type ProductsFilterSchema = z.infer<typeof productsFilterSchema>
