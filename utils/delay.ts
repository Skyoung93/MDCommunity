// To simulate a slower internet experience, since localhost is essentially instant?
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
