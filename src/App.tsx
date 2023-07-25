import Hand from './components/Hand';
import { ICard } from './interfaces/ICard';
import PlayerControls from './components/PlayerControls';
import Results from './components/Results';
import Bet from './components/Bet';
import { useState, useEffect } from 'react';
import './App.css';

export enum GameState {
  bet,
  playerTurn,
  dealerTurn,
  showResults,
}

function App() {
  enum Result {
    playerBust = "You Bust.",
    dealerBust = "Dealer Bust.",
    playerWin = "You Win.",
    dealerWin = "Dealers Wins.",
    push = "Push.",
  }

  const suits = ["Hearts", "Diamonds", "Spades", "Clubs"];
  const dealerStandsAt = 17

  const [playerHand, setPlayerHand] = useState<ICard[]>([]);
  const [dealerHand, setDealerHand] = useState<ICard[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>(GameState.bet)
  const [result, setResult] = useState<Result>(Result.dealerWin)
  const [chips, setChips] = useState<number>(100)

  useEffect(() => {
    if (gameState === GameState.dealerTurn) {
      if (calculateTotalValue(dealerHand) >= dealerStandsAt) {
        checkWin()
      } else {
        const newCard: ICard = dealCard()
        setDealerHand(prevDealerHand => [...prevDealerHand, newCard])
      }
    }
  }, [dealerHand])

  useEffect(() => {
    if (gameState === GameState.playerTurn) {
      if (calculateTotalValue(playerHand) > 21) {
        setResult(Result.playerBust)
        setGameState(GameState.showResults)
      }
    }
  }, [playerHand])

  const generateRandom = (min = 0, max = 100) => {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  };

  const placeBet = () => {
    dealInitialCards()
    setGameState(GameState.playerTurn)
  }

  const dealInitialCards = () => {
    const playerCards: ICard[] = [dealCard(), dealCard()];
    setPlayerHand(playerCards);

    const dealerCards: ICard[] = [dealCard(), dealCard(true)];
    setDealerHand(dealerCards);
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
    setGameState(GameState.showResults)
  }

  if (!isGameStarted) {
    return <button onClick={() => setIsGameStarted(true)}>Start</button>
  }

  if (gameState === GameState.bet) {
    return <Bet chips={chips} placeBet={placeBet} />
  }

  return (
    <>
      <Hand cards={dealerHand} gameState={gameState} />
      <p>Dealer count: {calculateTotalValue(dealerHand)}</p>
      <PlayerControls hit={hit} stand={stand} isPlayerTurn={gameState === GameState.playerTurn} />
      <p>Player count: {calculateTotalValue(playerHand)}</p>
      <Hand cards={playerHand} gameState={gameState} />
      {gameState === GameState.showResults && <Results result={result} setGameState={setGameState} />}
    </>
  );
}

export default App;
