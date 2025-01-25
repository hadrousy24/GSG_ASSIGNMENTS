import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/authProvider';
import { useContext } from 'react';
import "./nav-bar.css"
import { Role } from '../../types';

const NavBar = () => {
  const location = useLocation();
  const {user, logout} = useContext(AuthContext);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    logout();
  }

  return (
    <nav>
      <span>
        <Link className={location.pathname === "/" ? 'active' : ''} to='/'>Home Page</Link>
        {user?.role === Role.ADMIN && <Link className={location.pathname === "/add" ? 'active' : ''} to='/add'>Add Student</Link>}
        <Link className={location.pathname === "/about" ? 'active' : ''} to='/about'>About App</Link>
      </span>
      <span>
      {
          user?.userName
            ? `Hello ${user.userName}`
            : <Link to='/login' className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
        }
        {
          user?.userName && <Link onClick={handleLogout} to=''>Logout</Link>
        }
      </span>
    </nav>
  )
}

export default NavBar;