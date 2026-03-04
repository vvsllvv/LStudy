import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './component/pages/HomePage';
import CoursePage from './component/pages/CoursePage';
import ParagraphPage from './component/pages/ParagraphPage';
import Theme from './component/Theme';
import Header from './component/layout/Header';
import './css/style.css'
import './css/header.css'

function App() {
  return (
    <div className="App">
      <Header/>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="course/:courseId" element={<CoursePage />} />
          <Route path="paragraph/:paragraphId" element={<ParagraphPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
