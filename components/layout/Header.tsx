import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 cursor-pointer">
          VideoPlatform
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700 hidden sm:block">Hi, {user?.username}!</span>
              <Link href="/upload" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Upload
              </Link>
              <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-blue-500">
               Login
              </Link>
              <Link href="/register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
