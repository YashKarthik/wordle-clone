import Key from "./Key";
import { useCallback, useContext, useEffect } from 'react';
import { AppContext } from "../App";

export const Keyboard = () => {

  const {
    currAttempt,
    onSelectLetter,
    onEnter,
    onDelete,
    disabledLetters,
    correctLetters,
    presentLetters,
  } = useContext(AppContext);

  const keys = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['ENTR','Z','X','C','V','B','N','M', 'DEL'],
  ]

  const handleKeyboard = useCallback((event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      onEnter();
    } else if (event.key == "Backspace") {
      onDelete();
    } else {
      keys.forEach((row) => {
        const keyIndex = row.indexOf(event.key.toUpperCase());
        keyIndex != -1 ? onSelectLetter(row[keyIndex]) : {}
      });
    }
  }, [currAttempt]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    }

  }, [handleKeyboard]);


  return (
    <div className="m-9" onKeyDown={handleKeyboard}>
      <div className="flex justify-center">
        {keys[0].map(letter => (
          <Key value={letter} key={letter}
               disabled={disabledLetters.includes(letter)}
               correct={correctLetters.includes(letter)}
               present={presentLetters.includes(letter)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        {keys[1].map(letter => (
          <Key value={letter} key={letter}
               disabled={disabledLetters.includes(letter)}
               correct={correctLetters.includes(letter)}
               present={presentLetters.includes(letter)}
          />
        ))}
      </div>

      <div className="flex justify-center">
        {keys[2].map(letter => (
          <Key value={letter} key={letter}
               disabled={disabledLetters.includes(letter)}
               correct={correctLetters.includes(letter)}
               present={presentLetters.includes(letter)}
          />
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
