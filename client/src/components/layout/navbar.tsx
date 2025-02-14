import { Link, useLocation } from "wouter";
import { IoSnow } from "react-icons/io5";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center gap-2">
                <IoSnow className="h-8 w-8 text-primary animate-bounce" />
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Snow Day Calculator
                </span>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href}>
                <a
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {label}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map(({ href, label }) => (
                    <Link key={href} href={href}>
                      <a
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          location === href
                            ? "bg-primary/10 text-primary"
                            : "text-gray-600 hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        {label}
                      </a>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}