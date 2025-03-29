import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Landing } from './screens/Landing';
import { SignIn } from './screens/SignIn';
import { SignUp } from './screens/SignUp';
import { ToDoParent } from './screens/ToDoParent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tasks" element={<ToDoParent />} />
      </Routes>
    </Router>
  );
}

export default App;