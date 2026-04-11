import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sprout, Menu, X, ChevronRight, LogOut, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Crop Advisor", href: "/recommend" },
  { label: "Agri News", href: "/news" },
  { label: "Schemes", href: "/schemes" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-border/50 py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
            <Sprout className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg text-foreground">CropSense</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">AI</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-border/60 bg-secondary/70 px-3 py-1.5 text-sm text-muted-foreground">
                <UserCircle2 className="w-4 h-4 text-primary" />
                <span>{user.full_name || user.email}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" onClick={handleLogout}>
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold gap-1.5">
                  Get Started <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-border/50 mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-border/50">
            {user ? (
              <Button variant="outline" size="sm" className="w-full gap-2" onClick={handleLogout}>
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link to="/auth?tab=register" className="flex-1">
                  <Button size="sm" className="w-full bg-gradient-primary text-primary-foreground">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
