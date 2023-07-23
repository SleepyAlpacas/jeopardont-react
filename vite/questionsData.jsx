import React from 'react'
export default{

    "rows": 5,
    "columns": 6,

    "final-jeopardy": {
        "question": "Including special Pikmins and the unreleased Pikmin 4, the Pikmin series has had 11 types of Pikmin. Name 6 types of Pikmin.",
        "answer": <ul><li>Red Pikmin</li><li>Yellow Pikmin</li><li>Blue Pikmin</li>
            <li>Purple Pikmin</li><li>White Pikmin</li><li>Rock Pikmin</li>
            <li>Winged Pikmin (Pink Pikmin)</li><li>Ice Pikmin</li><li>Glow Pikmin (Green Pikmin)</li>
            <li>Bulbmin</li><li>Mushroom Pikmin</li></ul> 
    },

    "board-data": [
         {
            "title": "Picture Puns",
            "column-questions": [
                {
                    "value": 100,
                    "question": <img className='question-img' src='./public/imagesquestionanswer/pictureq100'/>,
                    "answer": <img className='question-img' src='./public/imagesquestionanswer/picturea100'/>
                },
                {
                    "value": 200,
                    "question": <img className='question-img' src='./public/imagesquestionanswer/pictureq200'/>,
                    "answer": <img className='question-img' src='./public/imagesquestionanswer/picturea200'/>
                },
                {
                    "value": 300,
                    "question": <img className='question-img' src='./public/imagesquestionanswer/pictureq300'/>,
                    "answer": <img className='question-img' src='./public/imagesquestionanswer/picturea300'/>
                },
                {
                    "value": 400,
                    "question": <img className='question-img' src='./public/imagesquestionanswer/pictureq400'/>,
                    "answer": <img className='question-img' src='./public/imagesquestionanswer/picturea400'/>
                },
                {
                    "value": 500,
                    "question": <img className='question-img' src='./public/imagesquestionanswer/pictureq500'/>,
                    "answer": <img className='question-img' src='./public/imagesquestionanswer/picturea500'/>
                }
            ]
        },

         {
            "title": "Toronto Tourist",
            "column-questions": [
                {
                    "value": 100,
                    "question": "Aquarium located at the base of the CN Tower",
                    "answer": "Ripley's Aquarium"
                },
                {
                    "value": 200,
                    "question": "Self proclaimed \"Toronto's Majestic Castle\"",
                    "answer": "Casa Loma"
                },
                {
                    "value": 300,
                    "question": "Huge international event for film snobs",
                    "answer": "TIFF"
                },
                {
                    "value": 400,
                    "question": "Toronto's baseball stadium",
                    "answer": "Rogers Centre"
                },
                {
                    "value": 500,
                    "question": "Toronto's most well known historic marketplace is famous for its food (apparently)",
                    "answer": "St. Lawrence Market"
                }
            ]
        },

        {
            "title": "Old Weapon Stuff",
            "column-questions": [
                {
                    "value": 100,
                    "question": "Name of this short roman sword",
                    "answer": "Gladius"
                },
                {
                    "value": 200,
                    "question": "Indian ring shaped throwing weapon",
                    "answer": "Chakram"
                },
                {
                    "value": 300,
                    "question": "Chinese equivalent of a naginata or glaive",
                    "answer": "Guandao"
                },
                {
                    "value": 400,
                    "question": "Name of a person who maintains the weapons and armors of a knight who also helps the knight get into his armor",
                    "answer": "Page"
                },
                {
                    "value": 500,
                    "question": "Viking sword name",
                    "answer": "Carolingian"
                }
            ]
        },

        {
            "title": "Zimbabwe",
            "column-questions": [
                {
                    "value": 100,
                    "question": "Name the currency of Zimbabwe",
                    "answer": "USD/Zimdollars (other answers may be accepted idk it's complicated)"
                },
                {
                    "value": 200,
                    "question": "Name a bordering country of Zimbabwe",
                    "answer": <ul><li>Mozambique</li><li>Zambia</li><li>Namibia</li><li>Botswana</li><li>South Africa</li></ul>
                },
                {
                    "value": 300,
                    "question": "Name one of Zimbabwe's top 5 exports",
                    "answer": <ol><li>Gold</li><li>Nickel Mattes</li><li>Raw Tobacco</li><li>Ferroalloys</li><li>Diamonds</li></ol>
                },
                {
                    "value": 400,
                    "question": "Zimbabwe has 16 official languages which earned the country a world record at one point. Excluding English, name 1 official language.",
                    "answer": <ul><li>Chewa</li><li>Chibarwe</li><li>Kalanga</li><li>Koisan</li><li>Nambya</li><li>Ndau</li><li>Ndebele</li><li>Shangani</li><li>Shona</li><li>Sign Language</li><li>Sotho</li><li>Tonga</li><li>Tswana</li><li>Venda</li><li>Xhosa</li></ul>
                },
                {
                    "value": 500,
                    "question": "Capital of Zimbabwe",
                    "answer": "Harare"
                }
            ]
        },

        {
            "title": "Kachow",
            "column-questions": [
                {
                "value": 100,
                "question": "The Sentra, Altima, and Pathfinder are made by which manufacturer?",
                "answer": "Nissan"
            },
            {
                "value": 200,
                "question": "Some highways have special sections during peak times called HOV Lanes. What does HOV stand for?",
                "answer": "High-Occupancy Vehicles"
            },
            {
                "value": 300,
                "question": "Italian luxury car manufacturer featuring a trident as its logo",
                "answer": "Maserati"
            },
            {
                "value": 400,
                "question": "A V8 engine has 8 of these",
                "answer": "Cylinders"
            },
            {
                "value": 500,
                "question": "The first American produced Japanese car which became the best selling Japanese car in America for 15 straight years",
                "answer": "Honda Accord"
            }
            ]
        },

        {
            "title": "Commerical Jingles",
            "column-questions":[
                {
                    "value": 100,
                    "question": <audio controls> <source src='./public/audioquestionanswer/audioq100'/> </audio>,
                    "answer": "Bounty"
                },
                {
                    "value": 200,
                    "question": <audio controls> <source src='./public/audioquestionanswer/audioq200'/> </audio>,
                    "answer": "Pizza Nova"
                },
                {
                    "value": 300,
                    "question": <audio controls> <source src='./public/audioquestionanswer/audioq300'/> </audio>,
                    "answer": "Sleep Country"
                },
                {
                    "value": 400,
                    "question": <audio controls> <source src='./public/audioquestionanswer/audioq400'/> </audio>,
                    "answer": "Hakim Optical"
                },
                {
                    "value": 500,
                    "question": <audio controls> <source src='./public/audioquestionanswer/audioq500'/> </audio>,
                    "answer": "Alarmforce"
                }
            ]
        }
    ]
    
}