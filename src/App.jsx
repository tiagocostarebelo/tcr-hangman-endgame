import React from 'react';
import {clsx} from 'clsx';
import { useState } from 'react'
import { languages } from './assets/languages';

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState("react");
    const [guessedLetters, setGuessedLetters] = useState([]);

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
                onClick={() => { addGuessedLetter(letter) }}>{letter}</button>
        )
    });
    
    function addGuessedLetter(letter) {        
        setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]);
    };
    

    return (
        <main>
            <header>
                <h1>Hangman: Assembly Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className='game-status'>
                <h2>You win!</h2>
                <p>Well done!</p>
            </section>
            <section className='language-chips'>
                {langElements}
            </section>
            <section className="word-box">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver && <button className="new-game-btn">New Game</button>}
        </main>
    )
}