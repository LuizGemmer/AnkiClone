# Anki Clone
Você pode ler a versão em pt-br clicando [aqui](README pt-br.md).

This is a app made with the intention to learn the Electron and React frameworks, I just choose it to be a clone of the SRS application Anki because it is a aplication I use quite often, and just because.
Please do check out the Anki's official website at: 
> https://apps.ankiweb.net/ 
(or just type "anki" on google).

## About
This is a so called "space repetition system" application (SRS, for short), it's sole porpuse is to help you memorize things in a more efficient way by **(theoretically)** showing things you have a hard time memorizing more often than those you have a easier time memorizing.

### Cards
Cards have a back and front "faces", the front face show the user some information, for example, the japanese word for "eat", 食べる. On the back face it shows whatever the user wants to remember like the word's meaning and reading "meaning: to eat, reading: taberu". While the user is trying to remember what the meaning and reading of 食べる are, the back of the card is hidden, once the user feels like it remembered, the back face appears and the user judges if he remembered correctlly and how hard it was (the options provided are "error", "normal", and "easy", though they are just arbitrary choises). Based on the user input, the program reschedules the card and show it to the user once the scheduled day has come.

### Decks
Just a container for cards. Decks have their own special configurations where the user can determine how many cards he wants to review each day and how long it takes for a card to retire (not be shown ever again).

### Card types (not implemented)
This will allow users to customize the looks of their cards using html and css.

### Browser (being implemented)
This feature will allow users to see their collection and customize it (edit and delete cards)
