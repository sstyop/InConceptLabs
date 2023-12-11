export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function decodeHTMLEntities(input: string): string {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent || "";
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}