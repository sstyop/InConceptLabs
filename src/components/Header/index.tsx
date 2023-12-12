import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header>
      <Link to={location.pathname === '/' ? "/scoreboard" : "/"} className='text-green text-xl font-bold mt-4 ml-6 inline-block transition-all min-lg:hover:text-blue'>{location.pathname === '/' ? 'ScoreBoard' : 'Home'}</Link>
    </header>
  );
};