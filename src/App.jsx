import React from 'react';
import { useState } from 'react'
import { languages } from './assets/languages';

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState("react")

    const langElements = languages.map((language) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color
        }
        return (<span className="chip" style={styles} key={language.name}>{language.name}</span>)
    });

    const letterElements = currentWord.split("").map((letter, index) => {
        const upperCaseLetter = letter.toUpperCase();
        return (<span className="letter" key={index}>{upperCaseLetter}</span>)
    });

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const keyboardElements = alphabet.split("").map((letter) => {
        return (<button key={letter} className="keyboard-letter">{letter}</button>)
    });

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
            <button className="new-game-btn">New Game</button>
        </main>
    )
}