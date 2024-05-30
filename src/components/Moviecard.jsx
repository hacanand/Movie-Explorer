import React, { useState, useEffect ,useContext} from 'react'
 
import noimage from '../assets/images/no-image.jpg'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 
import { Link } from 'react-router-dom';
import Contextpage from '../Contextpage';

function Moviecard({ movie }) {
    const { user } = useContext(Contextpage);

    const [isBookmarked, setIsBookmarked] = useState(null);

    useEffect(() => {
        if (localStorage.getItem(movie.id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [movie.id]);

    // const BookmarkMovie = () => {
    //     if (!user) {
    //         toast.info("To bookmark this movie, please log in.");
    //     } else {
    //         setIsBookmarked(!isBookmarked)
    //         if (isBookmarked) {
    //             localStorage.removeItem(movie.id);
    //         } else {
    //             localStorage.setItem(movie.id, JSON.stringify(movie));
    //         }
    //     }
    // }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        layout
        className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden"
      >
        {/* bookmark buttons */}
        {/* <button
          className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl"
          onClick={BookmarkMovie}
        >
          
          {isBookmarked ? <AiFillStar /> : <AiOutlineStar />}
        </button> */}

        <div className="absolute bottom-0 w-full flex backdrop-blur-sm  justify-between items-end p-3 pt-0 z-20">
          <h1 className="bg-gradient-to-r from-pink-300  to-indigo-600 inline-block text-transparent bg-clip-text   text-xl font-bold  break-normal break-words">
            {movie.title || movie.name}
          </h1>

          {/* {(movie.vote_average || 0) > 7 ? (
            <h1 className="font-bold text-green-500 p-2 bg-zinc-900 rounded-full">
              {(movie.vote_average || 0).toFixed(1)}
            </h1>
          ) : (movie.vote_average || 0) > 5.5 ? (
            <h1 className="font-bold text-orange-400 p-2 bg-zinc-900 rounded-full">
              {(movie.vote_average || 0).toFixed(1)}
            </h1>
          ) : (
            <h1 className="font-bold text-red-600 p-2 bg-zinc-900 rounded-full">
              {(movie.vote_average || 0).toFixed(1)}
            </h1>
          )} */}
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
              //   src={"https://thetvdb.com" + movie.image }
            />
          )}
        </div>
      </motion.div>
    );
}

export default Moviecard
