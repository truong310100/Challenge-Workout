import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import NotFound404 from './pages/notFound404';
import Challenge from "./pages/Challenge";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Challenge />}/>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
