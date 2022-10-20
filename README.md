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
- [Screenshots](#screenshots)
- [Project Status](#project-status)
   * [Current Features](#current-features)
   * [Planned Features](#planned-features)
- [Areas To Imporove](#areas-to-improve)
- [Reflections](#reflections)
- [Installation](#installation)

## Technologies Used
- Reactjs - version 18.2
- Firebase - version 9.9
- Tailwindcss - version 3.1

## Screenshots
<img width="1000" src="https://user-images.githubusercontent.com/73000930/186699841-4ed08a8b-eb56-42e3-87d5-40400b95c808.png"> 
<img width="1000" src="https://user-images.githubusercontent.com/73000930/196997970-5a0c3a21-00ad-4ecd-bfd7-409ce7e3808a.png">




#### Current features
Presently, the app is at a stage where users can:
1. Register for a free account
2. Create habits and specify a repeat schedule
3. Mark habits as complete or incomplete
4. Edit existing habits

#### Presently working on:
- Organizing habits into different areas
- Individual habit details such as current streak
- Completion rate progress chart

#### Planned Features
- Ability to send friend invites
- Create habits groups with others
- Habit Reminders

## Areas to improve
The following are areas in which I am actively learning and working to implement in this project
- Testing (unit, integration, and end to end)
- Accessibility 

## Reflections

#### Why no component library?
I decided to not use existing react component libraries for a few reasons. Firstly, I like to create unique designs for my projects and implementing them with css. This helps improve my eye for design and also helps me strengthen my css knowledge. Secondly, I want to learn more about accessibility and creating accessible components. Building my own ui components forces me to think about accessibility and semantic tags, whereas using an existing library does that out of the box. 

Ultimately, it took me much longer to build simple components like buttons, inputs, dropdowns, etc, but in the process I learned new skills and gained an understanding of the pain points of modern front end development and what problems existing libraries solve.

#### Styling
I chose to use Tailwind css because it helps speed up development time by keeping styling and markup in one place, and also gives freedom to create unique designs.

#### Backend
I chose to utilize firebase as a backend service because it provides an easy way to create a full stack app without writing custom backend code. As this is a solo project and my focus is currently in front end development, I did not want to invest time learning and implementing a back end by myself, although it is something I eventually plan on doing. 

Nonetheless, using firebase gave me exposure to backend infrastructure like cloud functions and databases, and also introduced me to some new challenges. One of the challenges I had (and still having) was using the firestore database optimally to avoid costly operations and also to structure the data in a way that allows room for future growth. 

## Installation
In the project directory, run:

`npm start`

Open http://localhost:3000 to view in browser

