import React from "react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="mt-1 flex items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-8 py-5 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] dark:bg-zinc-900/70 dark:border-zinc-700/30"
          aria-label="Primary"
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center transition-transform hover:scale-105 duration-300"
          >
            <img 
              src="/logo.png" 
              alt="HealthRx Logo" 
              className="h-10 w-auto sm:h-12 object-contain filter drop-shadow-sm"
            />
            <span className="sr-only">HealthRx</span>
          </a>
          
          {/* Navigation Menu */}
          <ul className="hidden md:flex items-center gap-10 text-base font-medium text-zinc-700 dark:text-zinc-200">
            <li>
              <a 
                className="relative py-2 px-1 hover:text-teal-600 transition-all duration-300 group" 
                href="/products"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a 
                className="relative py-2 px-1 hover:text-teal-600 transition-all duration-300 group" 
                href="#science"
              >
                Science
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a 
                className="relative py-2 px-1 hover:text-teal-600 transition-all duration-300 group" 
                href="#about"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a 
                className="relative py-2 px-1 hover:text-teal-600 transition-all duration-300 group" 
                href="#contact"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="#shop"
              className="hidden sm:inline-flex rounded-xl border-2 border-teal-600/20 bg-white/80 px-6 py-3 text-sm font-semibold text-teal-700 shadow-lg backdrop-blur-sm hover:bg-white hover:border-teal-600/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 dark:bg-zinc-800/80 dark:text-teal-400 dark:hover:bg-zinc-700"
            >
              Explore
            </a>
            <a
              href="#buy"
              className="inline-flex rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-3 text-sm font-semibold text-white hover:from-teal-500 hover:to-teal-400 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 shadow-[0_10px_25px_-10px_rgba(13,148,136,0.6)] hover:shadow-[0_15px_35px_-10px_rgba(13,148,136,0.8)]"
            >
              Buy Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/80 transition-colors duration-200"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}