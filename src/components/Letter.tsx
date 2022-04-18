import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

interface LetterPropTypes {
  letterPos:number;
  attempt: number;
}

const Letter = ({letterPos, attempt}: LetterPropTypes) => {

  const { board,
          correctWord,
          setDisabledLetters,
          setCorrectLetters,
          setPresentLetters,
          currAttempt
  } = useContext(AppContext);

  const letter = board[attempt][letterPos];
  const [color, setColor] = useState(" text-black bg-white");



  useEffect(() => {

    if (letter !== "") {
      if (correctWord.indexOf(letter) == -1) {
        setColor(" bg-gray-600 text-white");
        setDisabledLetters(prev => [...prev, letter])
      } else if (correctWord.indexOf(letter) == letterPos) {
        setColor(" bg-lime-700 text-white");
        setCorrectLetters(prev => [...prev, letter])
      } else {
        setColor(" bg-yellow-600 text-white")
        setPresentLetters(prev => [...prev, letter])
      }
    }

  }, [currAttempt.attempt]);

  const baseClasses = "border border-slate-300 m-1 text-xl font-bold min-w-[50px] min-h-[50px] flex justify-center items-center";
  const tailwindClass = baseClasses + color;

  return (
    <div className={tailwindClass}>
      {letter}
    </div>
  );
}

export default Letter;
