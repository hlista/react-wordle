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
    if (selectedLetters.includes(letter) || selectedLetters.length === 5) return

    setSelectedLetters(currentLetters => [...currentLetters, letter])
  }, [selectedLetters])

  const evalSelectedLetters = useCallback(() => {
    const selectedWord = selectedLetters.join('')
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
      <div>
        Hello!
      </div>
  )
}

export default App
