import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntroPage  from './components/pages/IntroPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import HabitPage from './components/pages/HabitPage';
import CoummunityPage from './components/pages/CommunityPage';
import CalendarPage from './components/pages/CalendarPage';
import UserPage from "./components/pages/UserPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/community" element={<CoummunityPage />} />
        <Route path="/habit" element={<HabitPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="*" element={<IntroPage />} />
      </Routes>
    </BrowserRouter>
  );
}