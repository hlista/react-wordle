import styles from "./WordleBoard.module.css"

type WordleBoardProps = {
  guessedWords: string[]
  selectedLetters: string[]
  wordToGuess: string
}

function evalStyle(wordToGuessArray: string[], guessedWordArray: string[], index: number) {
  if (wordToGuessArray[index] === guessedWordArray[index]) {
    return styles.correct
  }
  if (wordToGuessArray.includes(guessedWordArray[index])) {
    return styles.hint
  }
  return styles.incorrect
}

export function WordleBoard({
  guessedWords,
  selectedLetters,
  wordToGuess
}: WordleBoardProps) {
  const guessedWordsLength = guessedWords.length
  const selectedLettersLength = selectedLetters.length
  const rowNumberArray = [1, 2, 3, 4, 5, 6]
  const columnNumberArray = [1, 2, 3, 4, 5]
  const wordToGuessArray = wordToGuess.split('')
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div className={`${styles.board}`}>
        {
          rowNumberArray.map(rowNum => {
            if (rowNum <= guessedWordsLength) {
              const splitWord = guessedWords[rowNum - 1].split('')
              return <div className={`${styles.row}`}>
                <div className={`${styles.tile} ${evalStyle(wordToGuessArray, splitWord, 0)}`}>
                  {splitWord[0]}
                </div>
                <div className={`${styles.tile} ${evalStyle(wordToGuessArray, splitWord, 1)}`}>
                  {splitWord[1]}
                </div>
                <div className={`${styles.tile} ${evalStyle(wordToGuessArray, splitWord, 2)}`}>
                  {splitWord[2]}
                </div>
                <div className={`${styles.tile} ${evalStyle(wordToGuessArray, splitWord, 3)}`}>
                  {splitWord[3]}
                </div>
                <div className={`${styles.tile} ${evalStyle(wordToGuessArray, splitWord, 4)}`}>
                  {splitWord[4]}
                </div>
              </div>
            } else if (rowNum === guessedWordsLength + 1) {
              return <div className={`${styles.row}`}>
                {
                  columnNumberArray.map(columnNum => {
                    if (columnNum <= selectedLettersLength) {
                      return <div className={`${styles.tile}`}>
                        {selectedLetters[columnNum - 1]}
                      </div>
                    } else {
                      return <div className={`${styles.tile}`}>
                      </div>
                    }
                  })
                }
              </div>
            } else {
              return <div className={`${styles.row}`}>
                {
                  columnNumberArray.map(columnNum => {
                    return <div className={`${styles.tile}`}>
                    </div>
                  })
                }
              </div>
            }
          })
        }
      </div>
    </div>
  )
}
/*
{
          guessedWords.map(guessedWord => {
            return guessedWord.split('').map(guessedLetter => {
              return (
                <div className={`${styles.box}`}>
                  {guessedLetter}
                </div>
              )
            })
          })
        }
        {
          selectedLetters.map(selectedLetter => {
            return (
              <div className={`${styles.box}`}>
                {selectedLetter}
              </div>
            )
          })
        }
*/