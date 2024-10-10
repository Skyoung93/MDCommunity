import { compareAsc, parseISO } from 'date-fns';

export const sortByEndDate = (
  a: string | null,
  b: string | null,
  asc: boolean = false
): number => {
  let A: string | null = null;
  let B: string | null = null;

  if (asc) {
    A = a;
    B = b;
  } else {
    A = b;
    B = a;
  }

  if (!A) return 1;
  if (!B) return -1;
  return compareAsc(parseISO(B), parseISO(A));
};
