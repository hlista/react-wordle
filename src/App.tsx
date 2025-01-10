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
  guessedWords.forEach(guessedWord => {
    guessedWord.split('').forEach((guessedLetter, index) => {
      if (guessedLetter === wordToGuess[index]) console.log(`${guessedLetter} is correct`)
    })
  })
  const [correctLetters, setCorrectLetters] = useState<string[]>([])

  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([])

  const [hintLetters, setHintLetters] = useState<string[]>([])

  const [isWinner, setIsWinner] = useState<boolean>(false)

  const isLoser = guessedWords.length > 5

  const addSelectedLetters = useCallback((letter: string) => {
    if (selectedLetters.length === 5) return

    setSelectedLetters(currentLetters => [...currentLetters, letter])
  }, [selectedLetters])

  const popSelectedLetters = useCallback(() => {
    if (selectedLetters.length === 0) return

    setSelectedLetters(currentLetters => {
      const newArray = [...currentLetters]
      newArray.pop();
      return newArray;
    })
  }, [selectedLetters])

  const evalSelectedLetters = useCallback(() => {
    const selectedWord = selectedLetters.join('')
    const wordToGuessArray = wordToGuess.split('')
    const newCorrectLetters = [...correctLetters]
    const newHintLetters = [...hintLetters]
    const newIncorrectLetters = [...incorrectLetters]
    if (selectedLetters.length < 5) return
    selectedLetters.forEach((letter, index) => {
      if (letter === wordToGuessArray[index] && !newCorrectLetters.includes(letter)) {
        newCorrectLetters.push(letter)
        if (newHintLetters.includes(letter)) {
          newHintLetters.filter((hintLetter) => hintLetter === letter)
        }
      } else if (wordToGuessArray.includes(letter) && !newCorrectLetters.includes(letter) && !newHintLetters.includes(letter)) {
        newHintLetters.push(letter)
      } else if (!wordToGuessArray.includes(letter) && !newIncorrectLetters.includes(letter)) {
        newIncorrectLetters.push(letter)
      }
    })

    setCorrectLetters(newCorrectLetters)
    setHintLetters(newHintLetters)
    setIncorrectLetters(newIncorrectLetters)

    if (wordToGuess === selectedWord) {
      setIsWinner(true)
    } else {
      setGuessedWords(currentWords => [...currentWords, selectedWord])
    }
  }, [selectedLetters, guessedWords, correctLetters, hintLetters, incorrectLetters])

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
  }, [selectedLetters, guessedWords])

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
  }, [selectedLetters, guessedWords, correctLetters, hintLetters, incorrectLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Backspace") return
      e.preventDefault()
      popSelectedLetters()
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [selectedLetters])

  console.log(correctLetters)
  console.log(incorrectLetters)
  console.log(hintLetters)
  return (
    <div style={{ fontSize: "2rem", textAlign: "center" }}>
      {isWinner && "Winner! - Refresh to try again"}
      {isLoser && "Nice Try - Refresh to try again"}
    </div>
  )
}

export default App
