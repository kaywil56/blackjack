import Hand from './components/Hand';
import { ICard } from './interfaces/ICard';
import PlayerControls from './components/PlayerControls';
import Results from './components/Results';
import { useState, useEffect } from 'react';
import './App.css';

export enum Result {
  playerBust = "You Bust.",
  dealerBust = "Dealer Bust.",
  playerWin = "You Win.",
  dealerWin = "Dealers Wins.",
  push = "Push.",
}

function App() {
  enum GameState {
    playerTurn,
    dealerTurn,
    init
  }

  enum Deal {
    player,
    dealer
  }

  const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
  const dealerStandsAt = 17

  const [playerHand, setPlayerHand] = useState<ICard[]>([]);
  const [dealerHand, setDealerHand] = useState<ICard[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>(GameState.init)
  const [result, setResult] = useState<Result | undefined>()

  useEffect(() => {
    if (gameState === GameState.dealerTurn) {
      if (calculateTotalValue(dealerHand) >= dealerStandsAt) {
        checkWin()
      } else {
        const newCard: ICard = dealCard()
        setDealerHand(prevDealerHand => [...prevDealerHand, newCard])
      }
    }
  }, [dealerHand.length])


  useEffect(() => {
    if (gameState === GameState.playerTurn) {
      console.log("enum working")
      if (calculateTotalValue(playerHand) > 21) {
        setResult(Result.playerBust)
        console.log("bust")
      }
    }
  }, [playerHand.length])

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

    const dealerCards: ICard[] = [dealCard(), dealCard(true)];
    setDealerHand(dealerCards);

    setGameState(GameState.playerTurn)
  };

  const handleDealerTurn = () => {
    revealDealerCard()
    setGameState(GameState.dealerTurn)
  }

  // Reveal facedown card
  const revealDealerCard = () => {
    const updatedDealerHand = dealerHand.map(card => ({ ...card, isFaceDown: false }))
    setDealerHand(updatedDealerHand)
  }

  const dealCard = (facedown = false): ICard => {
    const card: ICard = {
      suit: suits[Math.floor(Math.random() * suits.length)],
      value: generateRandom(2, 11),
      isFaceDown: facedown,
    };
    return card;
  };

  const startGame = () => {
    setIsGameStarted(true);
    dealInitialCards();
  };

  const calculateTotalValue = (cards: ICard[]): number => {
    return cards.reduce((total, card) => {
      if (!card.isFaceDown) {
        return total + card.value;
      }
      return total;
    }, 0);
  };

  const hit = () => {
    const newCard: ICard = dealCard();
    setPlayerHand(prevPlayerHand => [...prevPlayerHand, newCard]);
  };

  const stand = () => {
    setGameState(GameState.dealerTurn)
    handleDealerTurn()
  }

  const checkWin = () => {
    let playerScore = calculateTotalValue(playerHand)
    let dealerScore = calculateTotalValue(dealerHand)
    if (playerScore > dealerScore) {
      setResult(Result.playerWin);
    }
    else if (dealerScore > 21) {
      setResult(Result.dealerBust)
    }
    else if (dealerScore > playerScore) {
      setResult(Result.dealerWin);
    }
    else {
      setResult(Result.push);
    }
  }

  if (!isGameStarted) {
    return <button onClick={startGame}>Start</button>;
  }

  if (result) {
    return <Results result={result} setResult={setResult} />
  }

  return (
    <>
      <Hand cards={dealerHand} />
      <p>Dealer count: {calculateTotalValue(dealerHand)}</p>
      <PlayerControls hit={hit} stand={stand} isPlayerTurn={gameState === GameState.playerTurn} />
      <p>Player count: {calculateTotalValue(playerHand)}</p>
      <Hand cards={playerHand} />
    </>
  );
}

export default App;
