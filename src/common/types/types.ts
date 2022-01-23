/**
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#readonly-mapped-type-modifiers-and-readonly-arrays
 *
 * readonly 키워드를 변경 가능한 동등한 항목으로 다시 변환할 수 있습니다.
 */
export type Writeable<T> = {
  -readonly [P in keyof T]: T[P];
};
