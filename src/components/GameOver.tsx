import { useContext } from "react";
import { AppContext } from "../App";

const GameOver = (props: GameOverPropTypes) => {

  const { gameOver,
          correctWord,
          currAttempt,
  } = useContext(AppContext);

  return (
    <div className="flex flex-col justify-center items-center font-bold p-9">
      <div className="p-9 text-3xl ">
        {gameOver.guessedWord ? "You Won!":"You lost!"}
      </div>
      <div>
        {"Correct word was: " + correctWord}
        {gameOver.guessedWord && (<h3>Guessed in: {currAttempt.attempt}/6</h3>)}
      </div>
    </div>
  );
};

export default GameOver;
