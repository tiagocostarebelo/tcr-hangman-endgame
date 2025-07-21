import React from 'react';
import { clsx } from 'clsx';
import { useState } from 'react'
import { languages } from './assets/languages';
import { getFarewellText, randomWord } from './assets/utils';


export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState(() => randomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);

    const numGuessesLeft = languages.length - 1;
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

    const langElements = languages.map((language, index) => {
        const isLost = index < wrongGuessCount;
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        const className = clsx("chip", isLost && "lost")
        return (<span className={className} style={styles} key={language.name}>{language.name}</span>)
    });

    const letterElements = currentWord.split("").map((letter, index) => {
        const upperCaseLetter = letter.toUpperCase();

        return (<span className="letter" key={index}>{guessedLetters.includes(letter) ? upperCaseLetter : ""}</span>)
    });

    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
    const isGameLost = wrongGuessCount === langElements.length - 1;
    const isGameOver = isGameWon || isGameLost;
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const keyboardElements = alphabet.split("").map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isCorrect = isGuessed && currentWord.includes(letter);
        const isWrong = isGuessed && !currentWord.includes(letter);
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                aria-label={`Letter ${letter}`}
                onClick={() => { addGuessedLetter(letter) }}>{letter}</button>
        )
    });

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]);
    };

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    });

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <>
                    <p className="farewell-message">{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
                </>
            )
        }
        if (isGameWon) {
            return (
                <>
                    <h2>You Win!</h2>
                    <p>Well Done!</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2>You Lost!</h2>
                    <p>Keep trying! Better luck next time!</p>
                </>
            )
        }

        return null;
    }

    return (
        <main>
            <header>
                <h1>Hangman: Assembly Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section aria-live="polite" role="status" className={gameStatusClass}>
                {renderGameStatus()}
            </section>
            <section className='language-chips'>
                {langElements}
            </section>
            <section className="word-box">
                {letterElements}
            </section>
            {/* Combined visually-hidden aria-live region for status updates */}
            <section className="sr-only" aria-live="polite" role="status">
                <p>{currentWord.includes(lastGuessedLetter) ? `Correct! The letter ${lastGuessedLetter} is in the word` : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter => guessedLetters.includes(letter) ? letter + "." : "blank").join(" ")}</p>
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver && <button className="new-game-btn">New Game</button>}
        </main>
    )
}