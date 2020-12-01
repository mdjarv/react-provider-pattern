export const api = {
  fetch: (): Promise<string> => {
    return new Promise<string>(resolve => setTimeout(() => resolve(new Date().toISOString()), 3000))
  },

  failFetch: (): Promise<string> => {
    return new Promise<string>((_, reject) => setTimeout(() => reject('request failed'), 3000));
  }
}
