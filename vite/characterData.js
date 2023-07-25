import * as images from './src/assets/images/index'

export default [
    {
        name: "Mr. Happy",
        powerUses: 1000,
        icon: images.Happy,
        
        greenText: `Can activate to shower confetti onto the screen. Cooldown of 1 minute.`

    },
    {
        name: "Mr. Bump",
        powerUses: 1,
        icon: images.Bump,

        yellowText: `Once per game power. Activate to have a 50% chance of doubling your money, 
        40% chance of losing all your money, 10% chance of spreading money evenly across all players`
        
    },
    {
        name: "Mr. Nosey",
        powerUses: 3,
        icon: images.Nosey,

        greenText: `Three per game power. Activate after buzzing to ask another player what the answer is.`,
    },
    {
        name: "Mr. Clever",
        powerUses: 0,
        icon: images.Clever,

        greenText: `Gain a win streak of $50 per question`,
        redText: `Lose 25% more money on incorrect answers`,
    }
]