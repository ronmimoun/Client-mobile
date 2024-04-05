export function combineClassNames(
  classNames: (string | undefined | null | boolean)[]
) {
  return classNames.filter(Boolean).join(" ");
}
