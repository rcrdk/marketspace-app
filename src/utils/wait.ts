export async function wait(ms: number = 2500) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
