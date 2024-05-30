"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/images/mark.png";
import "@/assets/styles/navbar.css";
import { FaGoogle } from "react-icons/fa";
import { useState, useEffect,useRef } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [providers, setProviders] = useState(null);
  const menuRef = useRef(null);

  const { data: session } = useSession();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setToggleProfile(false);
    }
  };

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    setAuthProviders();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <>
      <nav className="bg-gray-700">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setToggleMenu((prev) => !prev)}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image
                  width={160}
                  height={40}
                  className="h-8 w-auto"
                  src={logo}
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    href="/"
                    className={`navbar-link ${
                      pathname === "/" ? "active" : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/properties"
                    className={`navbar-link ${
                      pathname === "/properties" ? "active" : ""
                    }`}
                  >
                    Properties
                  </Link>
                  {session && (
                    <Link
                      href="/properties/add"
                      className={`navbar-link ${
                        pathname === "/properties/add" ? "active" : ""
                      }`}
                    >
                      Add Property
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {!session &&
              providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="hidden sm:flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaGoogle className="mr-2" />
                  <span>Login or Register</span>
                </button>
              ))}
            {session && (
              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <div className="absolute bg-red-500 rounded-full notification-circle">
                    <span className="text-sm text-white p-1">12</span>
                  </div>
                  <div className="p-[5px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="text-gray-600 w-6 h-6"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                  </div>
                </button> */}

                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      ref={menuRef}
                      onClick={() => {
                        setToggleProfile((prev) => !prev);
                      }}
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <Image
                        width={40}
                        height={40}
                        className="h-8 w-8 rounded-full"
                        src={session?.user?.image}
                        alt=""
                      />
                    </button>
                  </div>

                  {toggleProfile && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      ref={menuRef}
                      tabIndex="-1"
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={()=> {
                          setToggleMenu(false);
                          signOut();
                        }}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {toggleMenu && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                className={`navbar-link-mobile ${
                  pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/properties"
                className={`navbar-link-mobile ${
                  pathname === "/properties" ? "active" : ""
                }`}
              >
                Properties
              </Link>
              <Link
                href="/properties/add"
                className={`navbar-link-mobile ${
                  pathname === "/properties/add" ? "active" : ""
                }`}
              >
                Add Property
              </Link>

              {!session &&
                providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                  >
                    <FaGoogle className="mr-2" />
                    <span>Login or Register</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
