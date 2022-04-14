import Link from "next/link";
import React from 'react'
import Container from "../components/container";


export default function Header() {
  
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
      <div className="absolute top-0 bg-transparent">
        <div className="mx-auto">
          <div className="flex justify-between items-center border-gray-100 py-8 md:py-12 md:justify-start space-x-4 md:space-x-10">
            <div className="flex justify-start">
              <a href="/">
                <img className="h-10 w-auto sm:h-12" src="/img/moon-logo.png" alt="moon logo"></img>
              </a>
            </div>
            <div className="flex items-center justify-end md:flex-1">
              <a href="/" className="text-base text-white hover:underline">
                Return Home
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}