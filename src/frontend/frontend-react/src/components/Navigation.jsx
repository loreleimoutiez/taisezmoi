import { Link } from "react-router-dom";
import Quack from "@/assets/images/quack.webp";
import ThemeToggle from "./ThemeToggle";

const Navigation = ({ isMenuOpen, toggleMenu }) => {
    return (
        <div className="bg-teal-700">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="relative inline-flex items-center justify-center p-2 text-white rounded-md hover:bg-teal-800 hover:text-white focus:outline-none z-20"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start relative">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src={Quack} alt="logo petit canard" />
                        </div>

                        <div className={`hidden sm:flex ${isMenuOpen ? "fixed left-0 top-[60px] z-30 bg-white w-72 h-full" : "relative sm:block sm:ml-6"}`}>
                            <div className="flex flex-row space-x-4 p-4">
                                <Link to="/quack-react" className="text-white hover:bg-teal-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    Quack Chatbot
                                </Link>
                                <Link to="/quack-react/documents" className="text-white hover:bg-teal-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    List of available documents
                                </Link>
                                <Link to="/quack-react/how-does-it-work" className="text-white hover:bg-teal-800 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                                    How does it work?
                                </Link>

                                {/* 🔥 Ajout du bouton ici */}
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <Link to="/quack-react" className="text-white hover:bg-teal-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                            Quack Chatbot
                        </Link>
                        <Link to="/quack-react/documents" className="text-white hover:bg-teal-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                            List of available documents
                        </Link>
                        <Link to="/quack-react/how-does-it-work" className="text-white hover:bg-teal-800 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                            How does it work?
                        </Link>

                        <div className="mt-2 px-3">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navigation;
