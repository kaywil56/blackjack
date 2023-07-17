import Hand from './components/Hand';
import { ICard } from './interfaces/ICard';
import PlayerControls from './components/PlayerControls';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
  const [playerHand, setPlayerHand] = useState<ICard[]>([]);
  const [playerTotal, setPlayerTotal] = useState<number>(0);
  const [dealerHand, setDealerHand] = useState<ICard[]>([]);
  const [dealerTotal, setDealerTotal] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  useEffect(() => {
    setPlayerTotal(calculateTotalValue(playerHand));
  }, [playerHand]);

  useEffect(() => {
    setDealerTotal(calculateTotalValue(dealerHand));
  }, [dealerHand]);

  const generateRandom = (min = 0, max = 100) => {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  };

  const dealInitialCards = () => {
    const playerCards: ICard[] = [dealCard(), dealCard()];
    setPlayerHand(playerCards);

    const dealerCards: ICard[] = [dealCard(), dealCard()];
    setDealerHand(dealerCards);
  };

  const dealCard = (): ICard => {
    const card: ICard = {
      suit: suits[Math.floor(Math.random() * suits.length)],
      value: generateRandom(2, 11),
      isFaceDown: false,
    };
    return card;
  };

  const startGame = () => {
    setIsGameStarted(true);
    dealInitialCards();
  };

  const calculateTotalValue = (cards: ICard[]): number => {
    return cards.reduce((total, card) => total + card.value, 0);
  };

  const hit = () => {
    const newCard: ICard = dealCard();
    setPlayerHand(prevPlayerHand => [...prevPlayerHand, newCard]);
  };

  if (!isGameStarted) {
    return <button onClick={startGame}>Start</button>;
  }

  return (
    <>
      <Hand cards={dealerHand} />
      <p>Dealer count: {dealerTotal}</p>
      <PlayerControls hit={hit} />
      <p>Player count: {playerTotal}</p>
      <Hand cards={playerHand} />
    </>
  );
}

export default App;
