import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Landing } from './screens/Landing';
import { SignIn } from './screens/SignIn';
import { SignUp } from './screens/SignUp';
import { ProfileSelection } from './screens/ProfileSelection';
import { ToDoParent } from './screens/ToDoParent';
import { ToDoChild } from './screens/ToDoChild';
import { AnalyticsView } from './screens/AnalyticsView';
import { SharedView } from './screens/SharedView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile-selection" element={<ProfileSelection />} />
        <Route path="/tasks" element={<ToDoParent />} />
        <Route path="/child-tasks" element={<ToDoChild childType="pink" />} />
        <Route path="/child-tasks-orange" element={<ToDoChild childType="orange" />} />
        <Route path="/analytics-view" element={<AnalyticsView />} />
        <Route path="/shared-view" element={<SharedView />} />
      </Routes>
    </Router>
  );
}

export default App;