import { useState } from "react";
import { Zone } from "../models/Zone.ts";

const repeat = <T>(n: number, v: T): T[] =>
  Array.from({ length: n }, () => v);

type Card = {
  id: string;
  name: string;
  zone: Zone;
};

const initialCards: Card[] = [
  "20",
  ...repeat(2, "15"),
  ...repeat(3, "10"),
  ...repeat(4, "5"),
  ...repeat(4, "4"),
  ...repeat(4, "3"),
  ...repeat(4, "2"),
  ...repeat(4, "1"),
  ...repeat(4, "0"),
  ...repeat(2, "-5"),
  "-10",
  "x2",
  "MAX →0",
  "?",
].map((name, id) => ({
  id: id.toString(),
  name,
  zone: Zone.Stack,
}));

export const useCard = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const moveCard = (id: string, zone: Zone) => {
    setCards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, zone } : card)),
    );
  };

  const pile = cards.filter((card) => card.zone === Zone.Pile);
  const stack = cards.filter((card) => card.zone === Zone.Stack);
  const hand = cards.filter((card) => card.zone === Zone.Hand);

  return { pile, stack, hand, moveCard };
};
