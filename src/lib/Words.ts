import words from "./words.txt";

// default board is gonna be an array of of six arrays, each array will have five empty slots.
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;

    await fetch(words)
        .then(res => res.text())
        .then(resp => {
            const wordArr = resp.split('\n');
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
            wordSet = new Set(wordArr);
        });

    return { wordSet, todaysWord };
}
