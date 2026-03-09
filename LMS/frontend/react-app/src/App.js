import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './component/pages/HomePage';
import CoursePage from './component/pages/CoursePage';
import ParagraphPage from './component/pages/ParagraphPage';
import ProfilePage from './component/pages/ProfilePage';
import CreateParagraph from './component/features/CreateParagraph';
import AdminPage from './component/pages/AdminPage';

import TestContent from './component/tests/TestContent';

import Header from './component/layout/Header';

import './css/style.css'
import './css/header.css'
import CreateTest from './component/features/CreateTest';

function App() {
  return (
    <div className="App">
      {/* <Header/> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="course/:courseId" element={<CoursePage />} />
          
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin-page" element={<AdminPage />} />

          <Route path="paragraph/:paragraphId" element={<ParagraphPage />} />
          <Route path="paragraph/:themeId/create" element={<CreateParagraph />} />

          <Route path="test/:testId" element={<TestContent />} />
          <Route path="test/:testId/create" element={<CreateTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
