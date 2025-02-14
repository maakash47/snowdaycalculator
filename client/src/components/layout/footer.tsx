import { Link } from "wouter";
import { IoSnow } from "react-icons/io5";

export default function Footer() {
  const links = {
    product: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" }
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" }
    ],
    contact: [
      { href: "/contact", label: "Contact Us" }
    ]
  };

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2">
                <IoSnow className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Snow Day
                </span>
              </a>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Accurate snow day predictions using real-time weather data and advanced algorithms.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {links.product.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <a className="text-sm text-gray-500 hover:text-primary">
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <a className="text-sm text-gray-500 hover:text-primary">
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              {links.contact.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <a className="text-sm text-gray-500 hover:text-primary">
                      {label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Snow Day Calculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
