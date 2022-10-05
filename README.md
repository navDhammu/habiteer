<img width="300" align="center" src="https://user-images.githubusercontent.com/73000930/183962956-bf63bc83-87f2-4759-a569-401e00d67de6.png" />

## About
Habiterr is a web app intended to help users build good habits through habit organization and progress tracking.

## Project Status
This project is in progress
> Live demo https://trackhabit.netlify.app/
#### How to login
Click "continue as test user". Alternatively, you may register for a new account

## Table of contents
- [Technologies Used](#technologies-used)
- [Screenshots and Gifs](#screenshots-and-gifs)
- [Project Status](#project-status)
   * [Current Features](#current-features)
   * [Planned Features](#planned-features)
- [Areas To Imporove](#areas-to-improve)
- [Code Examples](#code-examples)
- [Reflections](#reflections)
- [Installation](#installation)

## Technologies Used
- Reactjs - version 18.2
- Firebase - version 9.9
- Tailwindcss - version 3.1

## Screenshots and Gifs
<img width="450" src="https://user-images.githubusercontent.com/73000930/186699841-4ed08a8b-eb56-42e3-87d5-40400b95c808.png"> 
<img height="500" src="https://user-images.githubusercontent.com/73000930/194133114-76629574-55b1-4d0a-ab80-f3dbfccf237d.gif" />
<img width="450" src="https://user-images.githubusercontent.com/73000930/186700878-ea32a01a-b79c-45cd-aa63-c998ec215015.png">

#### Current features
Presently, the app is at a stage where users can:
1. Register for a free account
2. Create habits and specify a repeat schedule
3. Mark habits as complete or incomplete
4. Edit existing habits

#### Working On
I am working on the following:
- Organize habits into different areas
- Progress charts for individual habits as well as areas
- Overall snapshot on dashboard

#### Planned Features
These are features I have planned to be added in the future
- Ability to send friend invites
- Create habits groups with others
- Habit Reminders

## Areas to improve
The following are areas in which I am actively learning and working to implement in this project
- Testing (unit, integration, and end to end)
- Accessibility 

## Code Examples
- Using the context api to control modals: [view code](src/components/ui/GlobalModal.jsx)
- Creating and editing habit form: [view code](src/components/HabitCreateEditForm.jsx)
- useForm custom hook: [view code](src/hooks/useForm.js)
- useOnOutsideClick custom hook: [view code](src/hooks/useOnOutsideClick.js)

## Reflections

#### No component library
Whenever possible, I try to avoid learning abstractions and focus on building a strong foundation, i.e learn javascript before a javascript framework, css before bootstrap, etc. Therefore, I decided to not use existing react component libraries like material ui because I believe building those components on my own would be a good learning experience. It took me much longer to build simple components like buttons, but in the process I learned how these libraries are built and the purpose they serve. 

#### Tailwind css
Already being familiar with css, I wanted to focus on react and spend less time in styling while still being able to have custom styles. Tailwind css suited my needs in this case. It was easy to learn, helped speed up development time by keeping styling and markup in one place, and also gave freedom to create unique designs.

#### Firebase
I decided to use firebase because it provides an easy way to create a full stack app without writing backend code. As my focus is currently in front end development, I did not want to invest time learning back end, although it is something I eventually plan on doing. Nonetheless, using firebase gave me exposure to backend infrastructure like cloud functions and databases. One of the challenges I had with this project was how to structure the firebase firestore database optimally to avoid costly operations and also to structure the data in a way that allows room for future growth as I add more features.

## Installation
In the project directory, run:

`npm start`

Open http://localhost:3000 to view in browser

