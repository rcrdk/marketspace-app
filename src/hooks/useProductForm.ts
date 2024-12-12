import { ProductFormContext } from '@contexts/ProductFormContext'
import { useContext } from 'react'

export function useProductForm() {
  const context = useContext(ProductFormContext)

  return context
}
