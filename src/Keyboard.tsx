import styles from "./Keyboard.module.css"

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

type KeyboardProps = {
  correctLetters: string[]
  hintLetters: string[]
  incorrectLetters: string[]
  // addGuessedLetter: (letter: string) => void
  // removeGuessedLetter: (letter: string) => void
  disabled?: boolean
}

export function Keyboard({
  correctLetters,
  hintLetters,
  incorrectLetters,
  // addGuessedLetter,
  // removeGuessedLetter,
  disabled = false
}: KeyboardProps) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem"}}
    >
      {KEYS.map(key => {
          const isCorrect = correctLetters.includes(key)
          const isHint = hintLetters.includes(key)
          const isIncorrect = incorrectLetters.includes(key)
          return (
            <button
              //onClick={() => addGuessedLetter(key)}
              className={`${styles.btn} ${isCorrect ? styles.correct: ""} ${isHint ? styles.hint: ""} ${isIncorrect ? styles.incorrect: ""}`}
              key={key}
            >
              {key}
            </button>
          )
        })
      }

    </div>
  )
}
