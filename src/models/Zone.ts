export const Zone = {
  Stack: "stack",
  Pile: "pile",
  Hand: "hand",
} as const;

export type Zone = (typeof Zone)[keyof typeof Zone];

export const isZone = (x: unknown): x is Zone => {
  if (x === Zone.Stack) return true;
  if (x === Zone.Pile) return true;
  return x === Zone.Hand;
}
