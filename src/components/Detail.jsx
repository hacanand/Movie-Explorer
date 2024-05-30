import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";
import noimage from '../assets/images/movies.jpg'
import { FaPlay } from "react-icons/fa";
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import slugify from 'react-slugify';

export const Detail = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;

  const { loader, setLoader } = useContext(Contextpage);

  const { id } = useParams()

   const [moviedet, setMoviedet] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovieData = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api4.thetvdb.com/v4/movies/${id}/extended?short=false
`,
      headers: {
        Authorization: APIKEY,
      },
    };

    if(localStorage.getItem('moviedet')){
      setMoviedet(JSON.parse(localStorage.getItem('moviedet')));
      setLoader(false);
      return
    }
    const res=await axios.request(config)
    console.log(res.data.data)
    localStorage.setItem('moviedet', JSON.stringify(res.data.data));
    setMoviedet(res.data.data);

    setLoader(false);
  };

  // const fetchCast = async () => {
  //   const castdata = await fetch(
  //     `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language`
  //   );
  //   const castdetail = await castdata.json();
  //   setCastdata(castdetail.cast);
  //   setLoader(false);
  // }

  // const fetchVideo = async () => {
  //   const data = await fetch(
  //     `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`
  //   );
  //   const videodata = await data.json();
  //   setVideo(videodata.results);
  //   // console.log(videodata.results);
  // }

  useEffect(() => {
    fetchMovieData();
  }, []);
 
  
  return (
    <>
      {loader ? (
        <div className="h-screen w-full  flex justify-center items-center">
          <span className="loader m-10"></span>
        </div>
      ) : (
        <>
          <Link
            to="/"
            className="fixed z-10  text-4xl text-black bg-white m-3 md:m-5 rounded-full"
          >
            <HiChevronLeft />
          </Link>

          {/* poster */}
          <div className=" p-2 pt-10 h-full w-full  flex  ">
            {/* <img src={noimage} alt="" className="h-full w-full rounded" /> */}
            <div className="w-1/3 h-fit">
              {moviedet.name === null ? (
                <img src={noimage} className="h-full  w-full rounded" />
              ) : (
                <img
                  src={moviedet.image}
                  className="rounded object-contain h-full w-full"
                />
              )}
            </div>
            <div className="flex flex-col px-8 gap-2 w-2/3">
              <h1 className="text-white text-2xl font-bold">{moviedet.name}</h1>
              <h2 className="text-white cli">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quaerat, delectus vel! Nisi amet ab doloribus ratione. Quasi
                veniam quibusdam suscipit eum hic, possimus ipsam ipsum, illum
                praesentium soluta, odit eos.
              </h2>
              <div className="flex flex-wrap ">
                {moviedet.genres.map((tag) => (
                  <>
                    <div
                      key={tag.id}
                      className="text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2"
                    >
                      {tag.name}
                    </div>
                  </>
                ))}
              </div>
              <div className="text-blue-100 font-semibold my-3 flex ">
                <h2 className="bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full">
                  Release Date : {moviedet.first_release.date}
                </h2>
              </div>
            </div>
          </div>
          <div className=" p-2  px-4  w-full ">
            <Tabs className=" py-2 w-full ">
              <TabList className="w-8 space-x-16 flex font-bold text-white ">
                <Tab>Overview</Tab>
                <Tab>Cast</Tab>
                <Tab>Trailer</Tab>
              </TabList>
              <TabPanel>
                  <div className="text-white w-full  pt-5 px-3   font-Roboto text-[18px]">
                    {/* create a table that show data in two column  in full width with right align data in second column */}
                    <table className="w-full">
                      <tr>
                        <td className="text-left">Original Title</td>
                        <td className='text-right'>moviedet.original_title</td>
                      </tr>
                      <tr>
                        <td className="text-right">Overview</td>
                        <td>moviedet.overview</td>
                      </tr>
                      <tr>
                        <td className="text-right">Release Date</td>
                        <td>moviedet.first_release.date</td>
                      </tr>
                      <tr>
                        <td className="text-right">Runtime</td>
                        <td>moviedet.runtime</td>
                      </tr>
                      <tr>
                        <td className="text-right">Rating</td>
                        <td>moviedet.rating</td>
                      </tr>
                      </table>
                    
                </div>
              </TabPanel>
            </Tabs>
          </div>
          {/* overview */}
          {/* <h2 className='text-white text-center pt-5 px-3 md:px-60 font-Roboto text-[18px]'>{moviedet.overview}</h2>

            <div className='text-blue-100 font-semibold my-3 flex justify-center'>
              <h2 className='bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full'>Release Date : {moviedet.first_release.date}</h2>
            </div>
  
             
            <div className='flex justify-center flex-wrap'>
              {moviegenres.map((tag) => (
                <>
                  <div key={tag.id} className='text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2'>{tag.name}</div>
                </>
              ))}
            </div>

            
            <div className='flex flex-col items-center'>
              <h1 className="text-3xl text-blue-300 font-semibold text-center p-2">Cast</h1>

              <div className="md:px-5 flex flex-row my-5 max-w-full flex-start overflow-x-auto relative
              scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
                {castdata.map((cast) => (
                  <>
                    {cast.profile_path !== null ? <>
                      <div className='flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1'>
                        <LazyLoadImage effect='blur' src={"https://image.tmdb.org/t/p/w500" + cast.profile_path} className="w-full h-full rounded-xl" />
                        <p className='text-white'>{cast.name}</p>
                        <p className='text-blue-300'>({cast.character})</p>
                      </div>
                    </> : null}
                  </>
                ))}
              </div>
            </div>

           
            <div className='flex justify-center items-center mb-10 gap-5 flex-wrap'>
              {Array.from(video).filter(trail => trail.type === "Trailer").map((trail, index) => (
                <>
                    <>
                      <a key={trail.id} href={'https://www.youtube.com/watch?v=' + trail.key} target="_blank" className='flex border-2 border-red-600 bg-red-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white'>
                        <FaPlay />Watch trailer {Array.from(video).filter(trail => trail.type === "Trailer").length>1?index+1:""}
                      </a>
                    </>
                </>
              ))
              }
            </div> 
 
            <div className='flex justify-center items-center mb-10 gap-5 flex-wrap'>
              <Link  to={`/player/${id}/${slugify(moviedet.title)}`} className='flex border-2 border-green-600 bg-green-600/40 p-3 items-center justify-center gap-2 text-xl font-semibold rounded-full text-white'>
                <FaPlay />Watch Movie
              </Link>
              
            </div> */}
        </>
      )}
    </>
  );
}
