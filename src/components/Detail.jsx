import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";
import noImage from '../assets/images/no-image.jpg'
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const Detail = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;
const [loader, setLoader] = useState(true);
  // const { loader, setLoader } = useContext(Contextpage);

  const { id } = useParams()

   const [moviedet, setMoviedet] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);

  const fetchMovieData = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api4.thetvdb.com/v4/movies/${id}/extended?short=false`,
      headers: {
        Authorization: APIKEY,
      },
    };

    // if(localStorage.getItem('moviedet')){
    //   setMoviedet(JSON.parse(localStorage.getItem('moviedet')));
    //   setLoader(false);
    //   return
    // }
    const res=await axios.request(config)
   // console.log(res.data.data)
    // localStorage.setItem('moviedet', JSON.stringify(res.data.data));
    setMoviedet(res.data.data);
    setLoader(false);
  };

   

  useEffect(() => {
    fetchMovieData();
  }, []);
 
  
  return (
    <>
      {loader ? (
        <div className="h-screen w-full  flex justify-center items-center">
          <span className="loader m-10"> Loading...</span>
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
              {moviedet?.name === null ? (
                <img src={noImage} className="h-full  w-full rounded" />
              ) : (
                <img
                  src={moviedet?.image}
                  className="rounded object-contain h-full w-full"
                />
              )}
            </div>
            <div className="flex flex-col px-8 gap-2 w-2/3">
              <h1 className="text-white text-2xl font-bold">
                {moviedet?.name}
              </h1>
              <h2 className="text-white cli">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quaerat, delectus vel! Nisi amet ab doloribus ratione. Quasi
                veniam quibusdam suscipit eum hic, possimus ipsam ipsum, illum
                praesentium soluta, odit eos.
              </h2>
              <div className="flex flex-wrap ">
                {moviedet?.genres?.map((tag) => (
                  <div
                    key={tag.id}
                    className="text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
              <div className="text-blue-100 font-semibold my-3 flex ">
                <h2 className="bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full">
                  Release Date : {moviedet?.first_release?.date}
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
                <Tab>Artworks</Tab>
                <Tab>Companies</Tab>
              </TabList>
              <TabPanel>
                <div className="text-white w-full pt-5 px-3 font-Roboto  ">
                  <table className="w-full text-blue-300">
                    <tbody>
                      <tr>
                        <td className="text-left capitalize">Original Title</td>
                        <td className="text-right">{moviedet?.name}</td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">
                          name Translations
                        </td>
                        <td className="text-right flex justify-end py-4  gap-2  flex-wrap">
                          {moviedet?.nameTranslations?.map((name, index) => (
                            <p key={index}>{name}</p>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">runtime</td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.runtime}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">Budget</td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.budget}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">
                          box Office
                        </td>
                        <td className="text-right capitalize py-4 ">
                          <div> {moviedet?.boxOffice}</div>
                          <div>
                            US Box Office : {moviedet?.boxOfficeUS || "..."}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">
                          original Country
                        </td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.originalCountry}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">
                          original Language
                        </td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.originalLanguage}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">
                          subtitle Languages
                        </td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.subtitleLanguages || "...."}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">studios</td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.studios?.map((studio) => (
                            <div key={studio.id}>
                              <p>{studio?.name}</p>
                              <p>
                                Parent Studio :{studio?.parentStudio || " ..."}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">awards</td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.awards || "...."}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-left capitalize py-4 ">
                          content Ratings
                        </td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.contentRatings || "...."}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-white w-full pt-5 px-3 font-Roboto  ">
                  <div className="md:px-5 flex flex-row my-5 max-w-full flex-start overflow-x-hidden flex-wrap  relative scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
                    {moviedet?.characters?.map((cast) => (
                      <div
                        key={cast.id}
                        className="flex min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1"
                      >
                        <LazyLoadImage
                          effect="blur"
                          src={cast.image === "" ? noImage : cast.image}
                          className="w-full h-full rounded-xl"
                        />
                        <p className="text-white">{cast.name || "..."}</p>
                        <p className="text-blue-300">
                          ({cast.peopleType || "..."})
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-white w-full pt-5 px-3 font-Roboto  ">
                  <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
                    {loader ? (
                      <span className="loader m-10"></span>
                    ) : (
                      moviedet?.trailers?.map((trail, index) => (
                        <iframe
                          key={trail.id}
                          width="1280"
                          height="720"
                          src={`https://www.youtube.com/embed/${
                            trail.url.split("=")[1]
                          }`}
                          title={trail.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ))
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-white w-full pt-5 px-3 font-Roboto  ">
                  <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
                    {moviedet?.artworks?.map((artwork) => (
                      <img
                        key={artwork.id}
                        width={artwork.width}
                        height={artwork.height}
                        src={artwork.thumbnail || noImage}
                        alt={artwork.name}
                        className="w-96 h-96  rounded-xl m-2"
                      />
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-white w-full pt-5 px-3 font-Roboto  ">
                  <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
                    {Object.values(moviedet?.companies)
                      .flat()
                      .map((company) => (
                        // console.log(company.companyType),
                        <div
                          key={company.id}
                          className="flex  flex-col items-center gap-2"
                        >
                          <div className="bg-gray-800 w-48 h-48 p-2 flex justify-center flex-col items-center gap-2 rounded-xl">
                            <h1 className="text-white  font-bold">
                              {company.name}
                            </h1>
                            <p className="text-blue-300">
                              {company.companyType.companyTypeName}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </>
      )}
    </>
  );
}
