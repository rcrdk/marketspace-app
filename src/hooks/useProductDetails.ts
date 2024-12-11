import { ProductDetailsContext } from '@contexts/ProductDetailsContext'
import { useContext } from 'react'

export function useProductDetails() {
  const context = useContext(ProductDetailsContext)

  return context
}
