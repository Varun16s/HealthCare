import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Brain, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-sage-100" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" data-testid="link-home">
            <Brain className="text-primary-500 h-8 w-8 mr-3" />
            <span className="text-xl font-semibold text-sage-700">MindMap AR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sage-600 hover:text-primary-600 transition-colors ${
                  location === link.href ? "text-primary-600 font-medium" : ""
                }`}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link href="/dashboard" data-testid="link-dashboard">
                  <Button className="bg-secondary-500 hover:bg-secondary-600" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-sage-600 hover:text-red-500"
                  data-testid="button-logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" data-testid="link-login">
                <Button className="bg-primary-500 hover:bg-primary-600" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-sage-600" />
              ) : (
                <Menu className="h-6 w-6 text-sage-600" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-sage-100" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block w-full text-left text-sage-600 hover:text-primary-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block w-full bg-secondary-500 text-white px-4 py-2 rounded-lg text-center"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-link-dashboard"
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-sage-600 hover:text-red-500"
                  data-testid="mobile-button-logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/login"
                className="block w-full bg-primary-500 text-white px-4 py-2 rounded-lg text-center"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-link-login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
