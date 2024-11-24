import { useState } from "react";
import { Zone } from "../models/Zone.ts";

const repeat = <T>(n: number, v: T): T[] => Array.from({ length: n }, () => v);

// type State = {
//   counter: Record<number, number>;
//   isDouble: boolean;
//   isMaxToZero: boolean;
// };

const countScore = (cards: Card[]) => {
  let acc: number[] = [];
  let isDouble = false;
  let isMaxToZero = false;

  while (cards.length > 0) {
    const card = cards.pop();
    if (card === undefined) {
      break;
    }
    if (card.name === "x2") {
      isDouble = true;
    } else if (card.name === "MAX →0") {
      isMaxToZero = true;
    } else if (card.name === "?") {
      // TODO: Implement
    } else {
      acc.push(card.value);
    }
  }

  if (isMaxToZero) {
    const maxi = Math.max(...acc);
    acc = acc.map((v) => v === maxi ? 0 : v);
  }

  let sum = acc.reduce((acc, v) => acc + v, 0);
  if (isDouble) {
    sum *= 2;
  }
  return sum;
}

type Card = {
  id: string;
  name: string;
  value: number;
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
  value: Number(name),
  zone: Zone.Stack,
}));

export const useCard = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [numOfPlayers, setNumOfPlayers] = useState(4);

  const moveCard = (id: string, zone: Zone) => {
    setCards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, zone } : card)),
    );
  };

  const pile = cards.filter((card) => card.zone === Zone.Pile);
  const stack = cards.filter((card) => card.zone === Zone.Stack);
  const hand = cards.filter((card) => card.zone === Zone.Hand);
  const you = cards.filter((card) => card.zone === Zone.You);

  const deal = () => {
    if (stack.length < numOfPlayers) return;
    const shuffledStack = [...stack].sort(() => Math.random() - 0.5);
    const newHandIds = shuffledStack
      .slice(1, numOfPlayers)
      .map((card) => card.id);
    const yourCardId = shuffledStack[0].id;
    setCards((cards) =>
      cards.map((card) => {
        const zone =
          card.zone === Zone.Hand ||
          card.zone === Zone.Pile ||
          card.zone === Zone.You
            ? Zone.Pile
            : newHandIds.includes(card.id)
              ? Zone.Hand
              : card.id === yourCardId
                ? Zone.You
                : Zone.Stack;
        return { ...card, zone };
      }),
    );
  };

  const reset = () => {
    setCards(initialCards);
  };

  const total = countScore([...hand, ...you]);

  return {
    pile,
    stack,
    hand,
    you,
    moveCard,
    deal,
    reset,
    numOfPlayers,
    setNumOfPlayers,
    total,
  };
};
