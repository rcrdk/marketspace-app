export function isBooleanOrUndefined(value?: string) {
  if (!value) return undefined
  if (value === 'true') return true
  if (value === 'false') return false
  return undefined
}
