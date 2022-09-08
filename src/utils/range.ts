export function range(start: number, end: number) {
  let length = end - start + 1

  // return Array.from({ length }, (_, idx) => idx + start) // TODO: why is it so slow?
  return new Array(length).fill(0).map((_, i) => i + start)
}
