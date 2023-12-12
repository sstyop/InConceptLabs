import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, ScoreBoard } from './pages';
import { Header } from './components';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scoreboard" element={<ScoreBoard />} />
      </Routes>
    </Router >
  )
}

export default App;