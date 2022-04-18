import { useState, useEffect, createContext } from 'react'
import './App.css';

import { boardDefault, generateWordSet } from "./lib/Words";
import Keyboard from "./components/Keyboard";
import GameOver from './components/GameOver';
import Header from "./components/Header";
import Board from "./components/Board";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState<string[][]>(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [gameOver, setGameOver] = useState({gameOver:false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [presentLetters, setPresentLetters] = useState([]);

  useEffect(() => {
    generateWordSet()
      .then(words => {
        setWordSet(words.wordSet);
        setCorrectWord(words.todaysWord.toUpperCase());
      });
  }, []);


  const onSelectLetter = (value:string) => {
    if (currAttempt.letterPos > 4) return;
    const currBoard = [...board];
    currBoard[currAttempt.attempt][currAttempt.letterPos] = value;

    setBoard(currBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letterPos: currAttempt.letterPos + 1
    })
  }

  const onDelete = () => {
    if (currAttempt.letterPos == 0) return;
    const currBoard = [...board];
    currBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(currBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letterPos: currAttempt.letterPos - 1
    })
  }

  const onEnter = () => {
    if (currAttempt.letterPos != 5) return;
    let currWord = "";

    for (let i=0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({
        attempt: currAttempt.attempt + 1,
        letterPos: 0
      })
    } else {
      alert("Word not found")
    }

    if (currWord == correctWord) {
      setGameOver({gameOver:true, guessedWord:true})
    } else if (currAttempt.attempt == 5) {
      setGameOver({gameOver:true, guessedWord:false})
    }
  }

  return (
    <>
      <Header />
      <hr />

      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onSelectLetter,
        onDelete,
        onEnter,
        correctWord,
        disabledLetters,
        setDisabledLetters,
        gameOver,
        setGameOver,
        correctLetters,
        setCorrectLetters,
        presentLetters,
        setPresentLetters
      }}>
        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </AppContext.Provider>
    </>
  )
}

export default App;
