import styles from "./WordleBoard.module.css"

type WordleBoardProps = {
  guessedWords: string[]
  selectedLetters: string[]
}

export function WordleBoard({
  guessedWords,
  selectedLetters
}: WordleBoardProps) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: ".5rem"}}
    >
      {
        guessedWords.map(guessedWord => {
          return guessedWord.split('').map(guessedLetter => {
            return (
              <div className={`${styles.div}`}>
                {guessedLetter}
              </div>
            )
          })
        })
      }
      {
        selectedLetters.map(selectedLetter => {
          return (
            <div className={`${styles.div}`}>
              {selectedLetter}
            </div>
          )
        })
      }
    </div>
  )
}