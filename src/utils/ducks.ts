import type { Duck, NewDuck } from "@/types/duck";

export function findDuplicateDuck(ducks: Duck[], candidate: NewDuck): Duck | undefined {
  return ducks.find(d =>
    d.color === candidate.color &&
    d.size === candidate.size &&
    d.price === candidate.price
  );
}
