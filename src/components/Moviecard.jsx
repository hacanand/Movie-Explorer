import React from "react";

import noimage from "../assets/images/no-image.jpg";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

function Moviecard({ movie }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      layout
      className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden"
    >
      <div className="absolute bottom-0 w-full flex backdrop-blur-sm  justify-between items-end p-3 py-1 z-20">
        <h1 className="bg-gradient-to-r from-pink-300  to-indigo-600 inline-block text-transparent bg-clip-text   text-xl font-bold  break-normal break-words">
          {movie.title || movie.name}
        </h1>
      </div>

      <Link
        to={`/moviedetail/${movie.id}`}
        className="h-full w-full shadow absolute z-10"
      ></Link>

      <div>
        {movie.image === null ? (
          <img className="img object-cover" src={noimage} />
        ) : (
          <LazyLoadImage
            effect="blur"
            className="img object-cover"
            src={
              movie.image === undefined
                ? movie.image_url
                : "https://thetvdb.com" + movie.image
            }
          />
        )}
      </div>
    </motion.div>
  );
}

export default Moviecard;
