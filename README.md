
# HOMEY 🏡 
 Household Planner System

**Homey** is a role-based task and event management platform designed for parents and children to collaborate on household responsibilities. Built with React, Tailwind CSS, and localStorage, it supports personal and assigned task lists, child-specific theming, shared family events, and interactive progress tracking.

---

## 🚀 Features

- 👨‍👩‍👧 Parent and Child roles with separate privileges
- 📝 Task creation, editing, deletion, and priority setting
- ✅ Mark tasks as in progress or complete
- 📅 Shared family calendar for events
- 📊 Analytics view for task performance
- 🎨 Dynamic theming based on user role
- 💾 Persistent localStorage-based state
- 🧪 Fully tested using Jest and React Testing Library

---

## 🛠️ Tech Stack

- **Frontend**: React, JSX, Tailwind CSS
- **State Management**: React Hooks (`useState`, `useContext`)
- **Persistence**: localStorage
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint with Airbnb style guide
- **Tooling**: Vite, Cursor, VSCode

---

## 📁 Project Structure
```
📦 
├─ .github
│  └─ workflows
│     ├─ eslint.yml
│     └─ sonarcloud.yml
├─ .gitignore
├─ Development Setup.md
├─ README.md
├─ __mocks__
│  └─ fileMock.js
├─ babel.config.cjs
├─ eslint.config.js
├─ index.html
├─ jest.config.cjs
├─ jest.setup.cjs
├─ package-lock.json
├─ package.json
├─ run-tests.cjs
├─ script.js
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ __tests__
│  │  ├─ classes
│  │  │  └─ Task.test.js
│  │  ├─ components
│  │  │  ├─ CreateTaskCard.test.jsx
│  │  │  ├─ CreateTaskCard.theme.test.jsx
│  │  │  ├─ EditTaskCard.test.jsx
│  │  │  └─ PersonalTaskList.test.jsx
│  │  └─ screens
│  │     └─ ToDoParent.test.jsx
│  ├─ assets
│  │  ├─ Bell.png
│  │  ├─ CharacterAdd.png
│  │  ├─ CharacterBlue.png
│  │  ├─ CharacterOrange.png
│  │  ├─ CharacterPink.png
│  │  ├─ HomeyLogo.png
│  │  ├─ User-Circle.png
│  │  ├─ child1.png
│  │  ├─ child2.png
│  │  └─ login.jpg
│  ├─ classes
│  │  ├─ Child.js
│  │  ├─ Parent.js
│  │  ├─ Task.js
│  │  └─ User.js
│  ├─ components
│  │  ├─ AddChild.jsx
│  │  ├─ AddEventModel.jsx
│  │  ├─ AssignedTasksList.jsx
│  │  ├─ Character.jsx
│  │  ├─ CharacterBubble.jsx
│  │  ├─ ChildBubble.jsx
│  │  ├─ CloudsAndStars.jsx
│  │  ├─ CreateTaskCard.jsx
│  │  ├─ EditTaskCard.jsx
│  │  ├─ ManageChildList.jsx
│  │  ├─ NavBar.jsx
│  │  ├─ ParentChildSelector.jsx
│  │  ├─ PersonalTaskList.jsx
│  │  └─ TaskCard.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ mockData
│  │  └─ mockdata.js
│  ├─ screens
│  │  ├─ AnalyticsView.jsx
│  │  ├─ Landing.jsx
│  │  ├─ ProfileSelection.jsx
│  │  ├─ ProfileSelectionIntro.jsx
│  │  ├─ SharedView.jsx
│  │  ├─ SharedView2.jsx
│  │  ├─ SignIn.jsx
│  │  ├─ SignUp.jsx
│  │  ├─ ToDoChild.jsx
│  │  └─ ToDoParent.jsx
│  └─ utils
│     └─ localStorageManager.js
└─ vite.config.js
```
## 🧑‍💻 Local Setup Instructions
## How to setup dev environment

## repo setup

- ensure node is installed
  - check by doing ``` node -v ```
- git clone this repo
  - ``` git clone https://github.com/aqarooni02/Software-Design-Project.git ```
- cd into Software-Design-Project
  - ``` cd Software-Design-Project ```
- install node packages
  - ``` npm install ```
- Run live dev server
  - ``` npm run dev ```

## Create your own dev branch

- while in main checkout a new branch with your name
  - ``` git checkout -b "YourName" ```

### This is for ensuring your changes are in your isolated branch

## Update your dev branch with main

### To update your branch with the latest changes of main

### Typically done before starting on a new feature

- While in main, pull latest changes
  - ``` git pull ```
- Checkout your branch
  - ``` git checkout YourBranchName ```
- Merge latest main with your branch
  - ``` git merge main ```

## After developing your feature

### While on your branch follow these steps

- Add changes to be staged
  - ``` git add . ``` adds all changes
- Commit staged changes. This saves your commit locally
  - ``` git commit -m "commit message" ```
- Push your commits to your branch
  - ``` git push ```
  - You may get a prompt to set upstream origin. In that case copy the command it gives and run it
  - What this does is link your local branch to the cloud/remote branch in github

## Integrating your changes to main

### The reason for seperate dev branches is to allow resolving merge conflicts to be done in the dev branch instead of main

### main should only contain the latest error free code

- Pull latest changes from main branch
  - ``` git pull ```
- Ensure your branch has the changes
- While in main merge your branch into main
  - ``` git merge YourBranchName ```
- Ensure no conflicts, resolve if necessary
- Push the merged commits
  - ``` git push ```

## Useful git commands

- Log the commits in current branch
  - ``` git log ```
- Check the status and changes of the current branch
  - ``` git status ```
- Continue a merge after resolving conflicts
  - ``` git merge --continue ```
  
## Contributors
- **Athbi Salmeen** – Product Owner  
- **Ghareesa Albuflasa** – Scrum Master
- **Zain Mayoof** & **Ahmed Qarooni** – Development Team   
```
