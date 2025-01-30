export {}

declare global {
  interface Window {
    tempData?: {
      type?: 'expense' | 'income'
    } | null
  }
}
