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

const KEYROWONE = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
]

const KEYROWTWO = [
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l"
]

const KEYROWTHREE = [
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
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
      style={{ height: "200px"}}
    >
      <div style={{display: "flex", width: "100%", margin: "0 auto 8px"}}>
        {
          KEYROWONE.map(key => {
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
      <div style={{display: "flex", width: "100%", margin: "0 auto 8px"}}>
        {
          KEYROWTWO.map(key => {
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
      <div style={{display: "flex", width: "100%", margin: "0 auto 8px"}}>
        {
          <button className={`${styles.btn}`}>
            {"Enter"}
          </button>
        }
        {
          KEYROWTHREE.map(key => {
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
        {
          <button className={`${styles.btn}`}>
            {"<x]"}
          </button>
        }
      </div>
      

    </div>
  )
}
