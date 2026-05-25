export const generateRandomString = (length: number): string => {
  const array = new Uint8Array(Math.ceil(length / 2));
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').slice(0, length);
}
