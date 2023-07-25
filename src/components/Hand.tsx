import { GameState } from "../App";
import { ICard } from "../interfaces/ICard";
import Card from "./Card";
import "./Hand.css";
// import { animated, useTransition } from "@react-spring/web";
import { useState, useEffect, SetStateAction } from "react";

interface IHandProps {
  cards: ICard[]
  setDealerAnimationDone: React.Dispatch<SetStateAction<boolean>>
  gameState: GameState
}

const Hand = ({ cards, gameState }: IHandProps) => {
  // const [windowSize, setWindowSize] = useState<number[]>([]);

  // const readyCards = windowSize.length > 0 ? cards : []
  // const transitions = useTransition(readyCards, {
  //   trail: 1000,
  //   from: { transform: `translate(${windowSize[0]}px, -${windowSize[1]}px)` },
  //   enter: { transform: `translate(0, 0)` },
  //   onRest: () => {
  //     if (gameState == GameState.dealerTurn) {
  //       setDealerAnimationDone(true)
  //     }
  //   }
  // });

  // useEffect(() => {
  //   setWindowSize([window.innerWidth, window.innerHeight]);
  // }, []);

  return (
    <ul className="hand">
      <>
        {cards.map(card => {
          return <Card card={card} />
        })}
        {/* {transitions((style, item) => (
          <animated.div style={style}>
            <Card card={item} />
          </animated.div>
        ))} */}
      </>
    </ul>
  );
};

export default Hand;
