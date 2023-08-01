import * as images from './src/assets/images/index'

const defaultCharacterTraits = {
    powerUses: 0,
    correctAnswerModifier: 1.0,
    correctAnswerBonus: 0,
    incorrectAnswerModifier: 1.0,
    activatableOnScreen: [],
}

export default [
    {
        name: "Mr. Happy",
        icon: images.Happy,

        ...defaultCharacterTraits,
        powerUses: 1000,
        activatableOnScreen: ['board', 'question', 'answer'],
        
        greenText: `Can activate to shower confetti onto the screen. Cooldown of 1 minute.`

    },
    {
        name: "Mr. Bump",
        icon: images.Bump,

        ...defaultCharacterTraits,
        powerUses: 1,
        activatableOnScreen: ['board'],

        yellowText: `Once per game power. Activate to have a 50% chance of doubling your money, 
        40% chance of losing all your money, 10% chance of spreading money evenly across all players`
        
    },
    {
        name: "Mr. Nosey",
        icon: images.Nosey,

        ...defaultCharacterTraits,
        powerUses: 3,
        activatableOnScreen: ['question'],

        greenText: `Three per game power. Activate after buzzing to ask another player what the answer is.`,
    },
    {
        name: "Mr. Clever",
        icon: images.Clever,

        ...defaultCharacterTraits,
        incorrectAnswerModifier: 1.25,

        greenText: `Gain a win streak of $50 per question`,
        redText: `Lose 25% more money on incorrect answers`,
    },
    {
        name: "Little Miss Bossy",
        icon: images.Bossy,

        ...defaultCharacterTraits,
        powerUses: 1,
        activatableOnScreen: ['question'],

        greenText: `Once per game power. After buzzing, force another player to answer a question.`
    },
    {
        name: "Little Miss Lucky",
        icon: images.Lucky,

        ...defaultCharacterTraits,
        correctAnswerModifier: 0.0,

        yellowText: `Correct answers give a random amount of money from -200 to 500`
    },
    {
        name: "Mr. Wrong",
        icon: images.Wrong,

        ...defaultCharacterTraits,
        correctAnswerModifier: 0.75,
        incorrectAnswerModifier: 0.5,

        greenText: `Lose 50% less money on wrong answers`,
        redText: `Gain 25% less money on correct answers`
    },
    {
        name: "Little Miss Twins",
        icon: images.Twins,

        ...defaultCharacterTraits,

        greenText: `Getting a bingo on the Jeopardon't board gives you a bonus of $2500`
    },
    {
        name: "Speedy Gonzales",
        icon: images.Gonzales,

        ...defaultCharacterTraits,

        greenText:`Gain an additional $50 on correct answers if you buzz first`
    },
    {
        name: "Slowpoke Rodriguez",
        icon: images.Rodriguez,

        ...defaultCharacterTraits,

        greenText:`Gain an additional $100 on correct answers if you don't buzz in first`
    },
    {
        name: "Foghorn Leghorn",
        icon: images.Foghorn,

        ...defaultCharacterTraits,
        powerUses: 3,
        activatableOnScreen: ['question'],

        greenText: "Three per game power. Activate before answering a question to get 2 chances to answer a question correctly."
    },
    {
        name: "Michigan J. Frog",
        icon: images.Michigan,
        icon2: images.Michigan2,

        ...defaultCharacterTraits,
        powerUses: 1,
        activatableOnScreen: ['board'],

        greenText: "Once per game power. Activate to set money to $0"
    },
    {
        name: "Rocko",
        icon: images.Rocko,

        ...defaultCharacterTraits,
        powerUses: 2,
        activatableOnScreen: ['board'],
        rockoed: false,

        greenText: `Twice per game power. Before someone picks a question, you can activate this power
        to make the question take away points if someone answers it correctly. `
    },
    {
        name: "Stimpy",
        icon: images.Stimpy,

        ...defaultCharacterTraits,
        powerUses: 2,
        activatableOnScreen: ['board'],

        yellowText: `Twice per game power. Activate before picking a question to bet all your money on the next question (your money cannot be negative).`
    },
    {
        name: "Robot Krabs",
        icon: images.Krabs,

        ...defaultCharacterTraits,
        powerUses: 1,
        activatableOnScreen: ['question'],

        greenText: `Once per game power. Activate after buzzing in and get to ask ChatGPT any question that's 5 words or less.`
    },
    {
        name: "Porky Pig",
        icon: images.Porky,

        ...defaultCharacterTraits,

        greenText: `Getting a question right in every category grants you a $100 bonus on correct answers.`,
        redText: `You cannot stutter while answering`
    },
    {
        name: "Pompompurin",
        icon: images.Purin,

        ...defaultCharacterTraits,
        powerUses: 2,
        activatableOnScreen: ['board'],

        greenText: `Twice per game power. Put yourself and another player in the prisoner's dilemma.`
    },
    {
        name: "Gudetama",
        icon: images.Gudetama,

        ...defaultCharacterTraits,

        greenText: `For every question you don't buzz in, you gain a stackable $25 bonus on your next correct answer. 
        Getting a question wrong will reset the bonus. `
    },
    {
        name: "Cinnamoroll",
        icon: images.Cinnamoroll,

        ...defaultCharacterTraits,

        greenText: `See the Final Jeopardon't™ question before wagering.`
    },
    {
        name: "Christopher Nolan",
        icon: images.Chrinol,

        ...defaultCharacterTraits,
        powerUses: 3,
        activatableOnScreen: ['board', 'question', 'answer'],

        greenText: `Three per game ability. Can activate at any time to pause the game for 5 seconds.`
    }

]