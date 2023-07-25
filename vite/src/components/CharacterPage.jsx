import React from 'react'
import CharacterButton from './CharacterButton'
import { nanoid } from 'nanoid';

export default function CharacterPage(props){
    const characterButtonElements = props.characterPageData.map(
        character => <CharacterButton setPlayerCharacter = {props.setPlayerCharacter}
         key={nanoid()} characterData={character}/>
    )
    console.log(props.characterPageData);
    return (
        <div className='menu-select character-select'>
            {props.nextPage && 
            <button class="next-button"><h1>&#8250</h1></button>}
            {props.prevPage && 
            <button class="back-button"><h1>&#8249</h1></button>}
            {characterButtonElements}
        </div>
    )
    
}

/*
<div id="character-page-1" class="menu-select character-select">
        <button class="next-button" onclick="nextPage('character-select')"><h1 style="font-size: 300%">&#8250</h1></button>
        <h1 class="character-select-header"></h1>
        <div class="break"></div>
        <button onclick="setPlayerCharacter(0)" class="character">
            
            <h1 class="character-name">Mr. Happy</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/Mr._Happy.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text green-text">Can activate power to shower confetti onto the screen. Cooldown of 1 minute.</p>
                </div>
            </div>
        </button>
        <button onclick="setPlayerCharacter(1)" class="character">
            <h1 class="character-name">Mr. Bump</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/Bump2.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text yellow-text">
                        Once per game power. Activate to have a 50% chance of doubling your money, 40% chance of losing all your money, 10% chance of spreading money evenly across all players
                    </p>
                </div>
            </div>
        </button>
        <button onclick="setPlayerCharacter(2)" class="character">
            <h1 class="character-name">Mr. Nosey</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/Mr-nosey-5a.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text green-text">
                        Three per game power. Activate after buzzing to ask another player what the answer is.
                    </p>
                </div>
            </div>
        </button>
        <button onclick="setPlayerCharacter(3)" class="character">
            <h1 class="character-name">Mr. Clever</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/Mr_Clever-6A.PNG.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text green-text">
                        Gain a win streak bonus of $50 per question.
                    </p>
                    <p class="character-info-text red-text">
                        Lose 25% more money on incorrect answers.
                    </p>
                </div>
            </div>
        </button>
        <button onclick="setPlayerCharacter(4)" class="character">
            <h1 class="character-name">Little Miss Bossy</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/Littlemissbossy.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text green-text">
                        Once per game power. After buzzing, force another player to answer a question.
                    </p>
                </div>
            </div>
        </button>
        <button onclick="setPlayerCharacter(5)" class="character">
            <h1 class="character-name">Little Miss Lucky</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/Lucky1.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text yellow-text">
                        Correct answers give a random amount of money from -200 to 500
                    </p>
                </div>
            </div>
            
        </button>
        <button onclick="setPlayerCharacter(6)" class="character">
            <h1 class="character-name">Mr. Wrong</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/MR_WRONG_2A.PNG.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text green-text">
                        Lose 50% less money on wrong answers
                    </p>
                    <p class="character-info-text red-text">
                        Gain 25% less money on correct answers 
                    </p>
                </div>
            </div>
        </button>
        <button onclick="setPlayerCharacter(7)" class="character">
            <h1 class="character-name">Little Miss Twins</h1>
            <div class="break"></div>
            <img class="character-icon" src="images/Little_Miss_Twins4.PNG.webp">
            <div class="character-info">
                <div>
                    <p class="character-info-text green-text">
                        Getting a bingo on the jeopardy board gives you a bonus of $2500
                    </p>
                </div>
            </div>
        </button>
    </div>
*/