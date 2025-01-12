import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../lib/useAuthStore'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 
  const { isAuthenticated } = useAuthStore(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div className="bg-sky-500 w-full p-4 ">
      <div className="flex justify-between items-center p-4 mx-auto">
        <div className="flex flex-row gap-7 ">
          <h1 className="text-4xl font-medium font-lobster">Grace Tailors</h1>
          <h4 className="text-lg mt-[14px] font-lobster"> &quot; Grace is the only way &quot;</h4>
        </div>
        <button 
          className="md:hidden p-2 text-white" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <nav className="hidden md:flex md:items-center md:gap-8 mr-7 text-lg ">
          <ul className="flex gap-4">
            <li className='p-2 bg-sky-700 rounded-lg hover:bg-sky-900 hover:cursor-pointer hover:scale-105'>
              <Link to="/">Customer</Link>
            </li>
            <li 
              className='p-2 bg-sky-700 rounded-lg hover:bg-sky-900 hover:cursor-pointer hover:scale-105'
              onClick={handleAdminClick} 
              role="button"
              tabIndex={0} 
              onKeyPress={(e) => e.key === 'Enter' && handleAdminClick()} 
            >
              Admin
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-sky-500 p-4">
          <ul className="flex flex-col gap-5">
            <li className='p-2 bg-sky-700 rounded-lg hover:bg-sky-900 hover:cursor-pointer hover:scale-105'>
              <Link to="/">Customer</Link>
            </li>
            <li 
              className='p-2 bg-sky-700 rounded-lg hover:bg-sky-900 hover:cursor-pointer hover:scale-105'
              onClick={handleAdminClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminClick()}
            >
              Admin
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
