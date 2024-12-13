export function getPriceFormatted(amount: number) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
  })

  return formatter.format(amount / 100)
}
