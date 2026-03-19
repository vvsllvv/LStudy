import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './component/pages/HomePage';
import CoursePage from './component/pages/CoursePage';
import ParagraphPage from './component/pages/ParagraphPage';
import ProfilePage from './component/pages/ProfilePage';
import CreateParagraph from './component/features/CreateParagraph';
import CreateModule from './component/features/CreateModule';
import CreateCourse from './component/features/CreateCourse';
import AdminPage from './component/pages/AdminPage';
import RegisterUser from './component/pages/RegisterUser';

import TestContent from './component/tests/TestContent';

import Header from './component/layout/Header';

import './css/style.css'
import './css/header.css'
import CreateTest from './component/features/CreateTest';
import CreateTheme from './component/features/CreateTheme';
import LoginPage from './component/pages/auth/LoginPage';
import { AuthProvider } from './component/context/AuthContext';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <AuthProvider>
          <Header/>

          <Routes>
            
            <Route path="/" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterUser />}/>

            <Route path="/main" element={<HomePage />}/>
            <Route path="course/:courseId" element={<CoursePage />} />
            
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />

            <Route path="paragraph/:paragraphId" element={<ParagraphPage />} />
            <Route path="paragraph/:themeId/create" element={<CreateParagraph />} />

            <Route path="test/:testId" element={<TestContent />} />
            <Route path="test/:themeId/create" element={<CreateTest />} />

            <Route path="module/create" element={<CreateModule />} />

            <Route path="course/:moduleId/create" element={<CreateCourse />} />
            <Route path="theme/:courseId/create" element={<CreateTheme />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
