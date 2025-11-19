import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut } from 'lucide-react';
import { authApi } from '../services/api';

/**
 * Header component with navigation and authentication
 */
export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authApi.isAuthenticated();
  const isAdmin = authApi.hasRole('ROLE_ADMIN');
  const user = authApi.getCurrentUser();

  const handleLogout = () => {
    authApi.logout();
    navigate('/');
    window.location.reload();
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home and scroll to top
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  const handleProductsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home page, scroll to products section
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home then scroll to products
      navigate('/');
      // Wait for page to render, then scroll
      const scrollToProducts = () => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Retry if element not found yet
          setTimeout(scrollToProducts, 50);
        }
      };
      setTimeout(scrollToProducts, 150);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Uttam Printing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="/"
              onClick={handleHomeClick}
              className="text-gray-700 transition-colors hover:text-primary"
            >
              Home
            </a>
            <a
              href="/#products"
              onClick={handleProductsClick}
              className="text-gray-700 transition-colors hover:text-primary"
            >
              Products
            </a>
            <Link
              to="/contact"
              className="text-gray-700 transition-colors hover:text-primary"
            >
              Contact Us
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="text-gray-700 transition-colors hover:text-primary"
              >
                Admin Panel
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-700 transition-colors hover:text-red-600"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <a
                href="/"
                onClick={handleHomeClick}
                className="text-gray-700 transition-colors hover:text-primary"
              >
                Home
              </a>
              <a
                href="/#products"
                onClick={handleProductsClick}
                className="text-gray-700 transition-colors hover:text-primary"
              >
                Products
              </a>
              <Link
                to="/contact"
                className="text-gray-700 transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-700 transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <User className="h-4 w-4" />
                    {user?.username}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 text-left text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-primary hover:underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

