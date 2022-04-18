import { useContext } from "react";
import { AppContext } from "../App";

interface KeyPropTypes {
  value: string;
  disabled: boolean;
  correct: boolean;
  present: boolean;
}

const Key = ({value, disabled, correct, present}: KeyPropTypes) => {
  const {
    onSelectLetter,
    onDelete,
    onEnter
  } = useContext(AppContext);

  const handleClick = () => {
    if (value == "ENTR") {
      onEnter();
    } else if (value == "DEL") {
      onDelete();
    } else {
      onSelectLetter(value);
    }
  }

  const color = disabled === true ? "bg-slate-600" : (correct === true ? "bg-lime-700" : (present === true ? "bg-yellow-600":"bg-slate-400"));
  const tailwindClass = "rounded m-0.5 p-3 " + color

  return (
    <div className={tailwindClass}>
      <button onClick={handleClick}>
        {value}
      </button>
    </div>
  );
}

export default Key;
