export function range(start: number, end: number) {
  let length = end - start + 1

  return new Array(length).fill(0).map((_, i) => i + start)
}
