import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Contextpage from '../Contextpage';
import { motion } from "framer-motion";
import { HiMenuAlt1, HiX } from "react-icons/hi";
 

function Navbar() {

    const { header  } = useContext(Contextpage);
    const [activemobile, setActivemobile] = useState(false);

     
    const Navdata = [
        {
            id: 1,
            headername: "Genres",
            Name: "Genres",
            link : "/"
        },
        {
            id: 2,
            headername: "Trending Movies",
            Name: "Trending",
            link:"/trending"
        },
         
    ]

    return (
      <>
        
        <button
          className="z-40 text-3xl text-black fixed right-0 bottom-0 m-6 p-4 duration-150 rounded-full active:scale-90 bg-white block md:hidden"
          onClick={() => setActivemobile(!activemobile)}
        >
          {activemobile ? <HiX /> : <HiMenuAlt1 />}
        </button>

        <nav
          className={`${
            activemobile ? "block" : "hidden"
          } fixed bg-black/90 md:bg-black h-full w-full md:w-[15rem] z-30 md:block`}
        >
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="logo flex flex-col justify-center items-center m-7 gap-2"
              onClick={() => setActivemobile(!activemobile)}
            >
             
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="blue"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-film"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="2.18"
                  ry="2.18"
                ></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
              </svg>
              <h1 className="text-gray-400/70 font-bold text-2xl text-center">
                Movie Explorer
              </h1>
            </Link>
          </motion.div>

          <ul className="text-white font-semibold text-[16px] text-center px-5">
            {Navdata.map((data) => (
              <Link key={data.id} to={data.link}>
                <li
                  className={`${
                    header == data.headername
                      ? "bg-blue-500/20 border-blue-600 text-white"
                      : "bg-gray-500/20 border-black"
                  } p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600`}
                  onClick={() => setActivemobile(!activemobile)}
                >
                  {data.Name}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </>
    );
}

export default Navbar
