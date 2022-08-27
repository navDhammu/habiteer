<img width="300" align="center" src="https://user-images.githubusercontent.com/73000930/183962956-bf63bc83-87f2-4759-a569-401e00d67de6.png" />

## About
Habiterr is a web app intended to help users build good habits through habit organization, reminders, and progress tracking. It is my first (major) project with reactjs and is a work in progress.
> Live demo https://trackhabit.netlify.app/

For quick login, click "continue as test user". Alternatively, you may register for a new account

## Technologies Used
- Reactjs - version 18.2
- Firebase - version 9.9
- Tailwindcss - version 3.1

## Screenshots
<img width="450" src="https://user-images.githubusercontent.com/73000930/186699841-4ed08a8b-eb56-42e3-87d5-40400b95c808.png"> <img width="450" src="https://user-images.githubusercontent.com/73000930/186698724-aa97a985-81a6-4582-bd34-4b45e82c609a.png"> <img width="450" src="https://user-images.githubusercontent.com/73000930/186700504-86dcc11c-75f0-4e74-a846-ff9aa89deb90.png"><img width="450" src="https://user-images.githubusercontent.com/73000930/186700878-ea32a01a-b79c-45cd-aa63-c998ec215015.png">

## Project Status
**In progress**

### Current features
Users can:
- Register for a free account
- Create habits and specify a repeat schedule
- Mark habits as complete or incomplete
- Edit, archive, or delete habits

### Planned Features
- Daily, weekly, and monthly progress data with charts
- Reminders
- Ability to send invites and create habit groups with others

## Areas to improve
- Testing (with jest and react testing library)
- Better mobile user experience
- Accessibility 


## Reflections

#### No component library
Whenever possible, I try to avoid learning abstractions and focus on building a strong foundation, i.e learn javascript before a javascript framework, css before bootstrap, etc. Therefore, I decided to not use existing react component libraries like material ui because I believe building those components on my own would be a good learning experience. It took me much longer to build simple components like buttons, but in the process I learned how these libraries are built and the purpose they serve. 

#### Tailwind css
Already being familiar with css, I wanted to focus on react and spend less time in styling while still being able to have custom styles. Tailwind css suited my needs in this case. It was easy to learn, helped speed up development time by keeping styling and markup in one place, and also gave freedom to create unique designs.

#### Firebase
I decided to use firebase because it provides an easy way to create a full stack app without writing backend code. As my focus is currently in front end development, I did not want to invest time learning back end, although it is something I eventually plan on doing. Nonetheless, using firebase gave me exposure to backend infrastructure like cloud functions and databases. One of the challenges I had with this project was how to structure the firebase firestore database optimally to avoid costly operations and also to structure the data in a way that allows room for future growth as I add more features.


