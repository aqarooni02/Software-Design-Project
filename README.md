
# HOMEY 🏡 
# Household Planner System

# Homey – Household Planning App

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
- refer to development guide
  
## Contributors
- **Athbi Salmeen** – Product Owner  
- **Ghareesa Albuflasa** – Scrum Master
- **Zain Mayoof** & **Ahmed Qarooni** – Development Team   
```
