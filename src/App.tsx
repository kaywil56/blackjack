import Hand from "./components/Hand";
import { ICard } from "./interfaces/ICard";
import PlayerControls from "./components/PlayerControls";
import Results from "./components/Results";
import { IChip } from "./interfaces/IChip";
import Bet from "./components/Bet";
import { useState, useEffect } from "react";
import { calculateTotalBet } from "./utils/calculateTotalBet";
import "./App.css";
import { convertStringValueToNumber } from "./utils/convertStringValueToNumber";

export enum GameState {
  bet,
  playerTurn,
  dealerTurn,
  showResults,
}

enum Result {
  playerBust = "You Bust.",
  dealerBust = "Dealer Bust.",
  playerWin = "You Win.",
  playerBlackJack = "Blackjack.",
  dealerWin = "Dealers Wins.",
  push = "Push.",
}

function App() {
  const dealerStandsAt = 17;
  const startingBank = 250;
  const blackjack = 21;
  const blackjackMultiplier = 1.5;

  const [playerHand, setPlayerHand] = useState<ICard[]>([]);
  const [dealerHand, setDealerHand] = useState<ICard[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>(GameState.bet);
  const [result, setResult] = useState<Result>(Result.dealerWin);
  const [bank, setBank] = useState<number>(startingBank);
  const [placedChips, setPlacedChips] = useState<IChip[]>([]);
  const [deck, setDeck] = useState<ICard[]>([]);

  useEffect(() => {
    if (gameState === GameState.dealerTurn) {
      if (calculateTotalValue(dealerHand) >= dealerStandsAt) {
        if (
          hasAnAce(dealerHand) &&
          calculateTotalValue(dealerHand) > blackjack
        ) {
          const updatedDealerHand = [...dealerHand];
          const aceIdx = updatedDealerHand.findIndex(
            (card) => card.rank === "A"
          );
          updatedDealerHand[aceIdx].value = 1;
          setDealerHand(updatedDealerHand);
        } else {
          checkWin();
        }
      } else {
        const newCard: ICard[] = dealCards();
        setDealerHand((prevDealerHand) => [...prevDealerHand, ...newCard]);
      }
    }
  }, [dealerHand]);

  useEffect(() => {
    if (gameState === GameState.playerTurn) {
      if (calculateTotalValue(playerHand) > 21) {
        if (hasAnAce(playerHand)) {
          const updatedPlayerHand = [...playerHand];
          const aceIdx = updatedPlayerHand.findIndex(
            (card) => card.rank === "A"
          );
          updatedPlayerHand[aceIdx].value = 1;
          setPlayerHand(updatedPlayerHand);
        } else {
          setResult(Result.playerBust);
          setPlacedChips([]);
          setGameState(GameState.showResults);
        }
      }
    }
  }, [playerHand]);

  useEffect(() => {
    initDeck();
  }, []);

  const hasAnAce = (hand: ICard[]): boolean => {
    // Already changed value of ace
    if (hand.some((card) => card.rank == "A" && card.value == 1)) {
      return false;
      // Has an ace
    } else if (hand.some((card) => card.rank == "A" && card.value == 11)) {
      return true;
      // Does not have an ace
    } else {
      return false;
    }
  };

  const initDeck = () => {
    const updatedDeck = [...generateDeck(), ...generateDeck()];
    const shuffledDeck = shuffleDeck(updatedDeck);
    setDeck(shuffledDeck);
  };

  const shuffleDeck = (deck: ICard[]): ICard[] => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  const generateDeck = () => {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];

    const deck = [];

    for (const suit of suits) {
      for (const rank of ranks) {
        const card = {
          suit: suit,
          value: convertStringValueToNumber(rank),
          rank: rank,
          isFaceDown: false,
        };
        deck.push(card);
      }
    }

    return deck;
  };

  const placeBet = () => {
    dealInitialCards();
    setGameState(GameState.playerTurn);
  };

  const dealInitialCards = () => {
    const initialCards = dealCards(4);
    const playerCards: ICard[] = [initialCards[0], initialCards[1]];
    setPlayerHand(playerCards);

    initialCards[3].isFaceDown = true;
    const dealerCards: ICard[] = [initialCards[2], initialCards[3]];
    setDealerHand(dealerCards);
  };

  const handleDealerTurn = () => {
    revealDealerCard();
    setGameState(GameState.dealerTurn);
  };

  // Reveal facedown card
  const revealDealerCard = () => {
    const updatedDealerHand = dealerHand.map((card) => ({
      ...card,
      isFaceDown: false,
    }));
    setDealerHand(updatedDealerHand);
  };

  const dealCards = (amount: number = 1): ICard[] => {
    const currentDeck = [...deck];
    const drawnCards = [];
    for (let i = 0; i < amount; i++) {
      const selectedCard = currentDeck.pop()!;
      drawnCards.push(selectedCard);
    }
    setDeck(currentDeck);
    return drawnCards;
  };

  const calculateTotalValue = (cards: ICard[]): number => {
    return cards.reduce((total, card) => {
      if (!card.isFaceDown) {
        return total + card.value;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    console.log(deck);
  }, [deck]);

  const hit = () => {
    const newCard: ICard[] = dealCards();
    setPlayerHand((prevPlayerHand) => [...prevPlayerHand, ...newCard]);
  };

  const stand = () => {
    setGameState(GameState.dealerTurn);
    handleDealerTurn();
  };

  const checkWin = () => {
    const playerScore = calculateTotalValue(playerHand);
    const dealerScore = calculateTotalValue(dealerHand);
    const totalBet = calculateTotalBet(placedChips);
    let winnings: number;
    if (playerScore > dealerScore) {
      if (playerScore == blackjack) {
        setResult(Result.playerBlackJack);
        winnings = totalBet + totalBet * blackjackMultiplier;
        setBank((prevBank) => prevBank + winnings);
      } else {
        setResult(Result.playerWin);
        winnings = totalBet + totalBet;
        setBank((prevBank) => prevBank + winnings);
      }
    } else if (dealerScore > blackjack) {
      setResult(Result.dealerBust);
      winnings = totalBet + totalBet;
      setBank((prevBank) => prevBank + winnings);
    } else if (dealerScore > playerScore) {
      setResult(Result.dealerWin);
    } else {
      setResult(Result.push);
      setBank((prevBank) => prevBank + totalBet);
    }
    setPlacedChips([]);
    setGameState(GameState.showResults);
  };

  if (!isGameStarted) {
    return <button onClick={() => setIsGameStarted(true)}>Start</button>;
  }

  if (gameState === GameState.bet) {
    return (
      <>
        <h2 id="bank">Bank: {bank}</h2>
        <Bet
          bank={bank}
          setBank={setBank}
          placeBet={placeBet}
          placedChips={placedChips}
          setPlacedChips={setPlacedChips}
        />
      </>
    );
  }

  return (
    <>
      <h2 id="bank">Bank: {bank}</h2>
      <main>
        <Hand cards={dealerHand} gameState={gameState} />
        <p>Dealer count: {calculateTotalValue(dealerHand)}</p>
        <PlayerControls
          hit={hit}
          stand={stand}
          isPlayerTurn={gameState === GameState.playerTurn}
        />
        <p>Player count: {calculateTotalValue(playerHand)}</p>
        <Hand cards={playerHand} gameState={gameState} />
        {gameState === GameState.showResults && (
          <Results result={result} setGameState={setGameState} />
        )}
      </main>
    </>
  );
}

export default App;
