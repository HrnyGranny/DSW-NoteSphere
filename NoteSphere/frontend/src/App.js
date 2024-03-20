import './App.css';
import { Routes, Route } from 'react-router-dom';
import Message from './Message';
import MainPage from './MainPage';
import Notes from './Notes'; // Component Notes
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="message" element={<Message />} />
      <Route path="notes" element={<Notes />} />
    </Routes>
  );
}

export default App;
