import Hand from './components/Hand';
import PlayerControls from './components/PlayerControls';
import { ICard } from './interfaces/ICard';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const suits: string[] = ["Hearts", "Diamonds", "Spades", "Clubs"]
  const [playerDeck, setPlayerDeck] = useState<ICard[]>([])
  const [playerTotal, setPlayerTotal] = useState<number>(0)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)

  useEffect(() => {
    const count: number = calculateTotalValue(playerDeck)
    setPlayerTotal(count)
  }, [playerDeck.length])

  const generateRandom = (min: number = 0, max: number = 100) => {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }

  const dealInitialCards = () => {
    let playerCards: ICard[] = [
      dealCard(),
      dealCard()
    ]
    setPlayerDeck(playerCards)
  }

  const dealCard = (): ICard => {
    const card = {
      suit: suits[Math.floor(Math.random() * suits.length)],
      value: generateRandom(2, 11),
      isFaceDown: false
    }
    return card
  }

  const startGame = () => {
    setIsGameStarted(true)
    dealInitialCards()
  }

  const calculateTotalValue = (cards: ICard[]): number => {
    let count: number = 0
    cards.forEach(card => {
      count+=card.value
    })
    return count
  }

  const hit = () => {
    const newCard: ICard = dealCard() 
    setPlayerDeck(prevPlayerDeck => [...prevPlayerDeck, newCard])
  }

  // const stand = () => {
    
  // }

  if (!isGameStarted) {
    return <button onClick={startGame}>Start</button>
  }

  return (
    <>
      <PlayerControls hit={hit} />
      <p>{playerTotal}</p>
      <Hand cards={playerDeck} />
    </>
  )
}

export default App
