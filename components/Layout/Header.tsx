import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IoLibrary } from "react-icons/io5";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <IoLibrary />
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {user && (
            <div className="flex items-center justify-center mr-5 capitalize bg-blue-500 py-1 px-3 rounded-md text-white">
              <Link href="/createBook">+ Create</Link>
            </div>
          )}
          {user ? (
            <div className="flex items-center space-x-5">
              <Link
                href="/api/auth/logout"
                className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              >
                Logout
              </Link>
              <img
                alt="profile"
                className="rounded-full w-12 h-12"
                src={user.picture ? user.picture : ""}
              />
            </div>
          ) : (
            <Link
              href="/api/auth/login"
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
