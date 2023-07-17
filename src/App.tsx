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
    calculateTotalValue()
  }, [playerDeck.length])

  const generateRandom = (min: number = 0, max: number = 100) => {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }

  const dealInitialCards = () => {
    let cards: ICard[] = [
      dealCard(),
      dealCard()
    ]
    setPlayerDeck(cards)
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

  const calculateTotalValue = () => {
    let count = 0
    playerDeck.forEach(card => {
      count+=card.value
    })
    setPlayerTotal(count)
  }

  if (!isGameStarted) {
    return <button onClick={startGame}>Start</button>
  }

  return (
    <>
      <PlayerControls />
      <p>{playerTotal}</p>
      <Hand cards={playerDeck} />
    </>
  )
}

export default App
