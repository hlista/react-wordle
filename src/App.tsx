import { useState, useEffect, useCallback } from "react"

function App() {
  // word to guess
  const [wordToGuess, setWordToGuess] = useState(() => {
    return "apple"
  })

  // used for previous guesses
  const [guessedWords, setGuessedWords] = useState<string[]>([])

  // used for current word being guessed
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])

  // used for coloring
  const [correctLetters, setCorrectLetters] = useState<string[]>([])

  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([])

  const [hintLetters, setHintLetters] = useState<string[]>([])

  const [isWinner, setIsWinner] = useState<boolean>(false)

  const isLoser = guessedWords.length > 5

  const addSelectedLetters = useCallback((letter: string) => {
    if (selectedLetters.length === 5) return

    setSelectedLetters(currentLetters => [...currentLetters, letter])
  }, [selectedLetters])

  const evalSelectedLetters = useCallback(() => {
    const selectedWord = selectedLetters.join('')
    const wordToGuessArray = wordToGuess.split('')
    if (selectedLetters.length < 5) return
    selectedLetters.forEach((letter, index) => {
      if (letter === wordToGuessArray[index] && !correctLetters.includes(letter)) {
        setCorrectLetters(currentLetters => [...currentLetters, letter])
      }
      if (wordToGuessArray.includes(letter) && !correctLetters.includes(letter) && !hintLetters.includes(letter)) {
        setHintLetters(currentLetters => [...currentLetters, letter])
      }
      if (!wordToGuessArray.includes(letter)) {
        setIncorrectLetters(currentLetters => [...currentLetters, letter])
      }
    })
    if (wordToGuess === selectedWord) {
      setIsWinner(true)
    } else {
      setGuessedWords(currentWords => [...currentWords, selectedWord])
    }
  }, [selectedLetters])

  // update selectedLetters on keypress
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return
      console.log(selectedLetters)
      e.preventDefault()
      addSelectedLetters(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [selectedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return
      console.log("here")
      e.preventDefault()
      evalSelectedLetters()
      setSelectedLetters([])
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [selectedLetters])

  return (
    <div style={{ fontSize: "2rem", textAlign: "center" }}>
      {isWinner && "Winner! - Refresh to try again"}
      {isLoser && "Nice Try - Refresh to try again"}
    </div>
  )
}

export default App
