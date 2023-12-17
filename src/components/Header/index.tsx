import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header>
      <Link to="/" className={`text-green text-xl font-bold mt-4 ml-6 inline-block transition-all min-lg:hover:text-blue ${!location.pathname.includes('scoreboard') && 'text-red-700'}`}>Home</Link>
      <Link to="/scoreboard" className={`text-green text-xl font-bold mt-4 ml-6 inline-block transition-all min-lg:hover:text-blue ${location.pathname.includes('scoreboard') && 'text-red-700'}`}>ScoreBoard</Link>
    </header>
  );
};