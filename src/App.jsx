import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import TaskDetail from './pages/task-detail/task-detail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskDetail />} />
      </Routes>
    </>
  );
}

export default App;
