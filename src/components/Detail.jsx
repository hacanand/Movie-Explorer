import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import noImage from "../assets/images/no-image.jpg";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { toast } from "react-toastify";

export const Detail = () => {
  const navigate = useNavigate();
  const APIKEY = import.meta.env.VITE_API_KEY;
  const [loader, setLoader] = useState(true);

  let { id } = useParams();
  if (typeof id === "string" && id.includes("movie-") === false) {
    id = id;
  } else if (id.includes("movie-")) {
    id = id.split("-")[1];
  } else {
    navigate("/");
    toast.error("Invalid Movie ID");
  }

  //console.log(typeof data)

  const [moviedet, setMoviedet] = useState([]);

  const fetchMovieData = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api4.thetvdb.com/v4/movies/${id}/extended?short=false`,
      headers: {
        Authorization: APIKEY,
      },
    };
    console.log(moviedet);
    const res = await axios.request(config);

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

          <div className=" p-2 pt-10 h-full w-full flex max-md:flex-col">
            <div className="md:w-1/3 w-full h-fit">
              <LazyLoadImage
                effect="blur"
                src={moviedet?.image === null ? noImage : moviedet?.image}
                className="rounded object-contain h-full w-full"
              />
            </div>
            <div className="flex flex-col px-8 gap-2 w-full md:w-2/3">
              <h1 className="text-white text-2xl font-bold">
                {moviedet?.name}
              </h1>
              <h2 className="text-white cli">
                {moviedet?.translations !== undefined
                  ? moviedet?.translations?.overviewTranslations.find(
                      (overview) => overview.language === "eng"
                    ).overview
                  : "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
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
                  Release Date : {moviedet?.first_release?.date || "...."}
                </h2>
              </div>
            </div>
          </div>
          <div className=" w-full ">
            <Tabs className="p-4">
              <TabList className="overflow-x-auto flex  space-x-10 font-bold text-white scrollbar-none ">
                <Tab>Overview</Tab>
                <Tab>Cast</Tab>
                <Tab>Trailer</Tab>
                <Tab>Artworks</Tab>
                <Tab>Companies</Tab>
              </TabList>
              <TabPanel>
                <div className="w-full pt-5 px-5 font-Roboto  ">
                  <table className="w-full text-blue-300   pt-5 px-3 font-Roboto  ">
                    <tbody>
                      <tr className=" border-neutral-700 border-y-2">
                        <td className="text-left capitalize py-4">
                          Original Title
                        </td>
                        <td className="text-right">{moviedet?.name}</td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">
                          name Translations
                        </td>
                        <td className="text-right flex justify-end py-4  gap-2  flex-wrap">
                          {moviedet?.nameTranslations?.map((name, index) => (
                            <p key={index}>{name}</p>
                          ))}
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">runtime</td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.runtime}
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">Budget</td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.budget || "...."}
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">
                          box Office
                        </td>
                        <td className="text-right capitalize py-4 ">
                          <div> {moviedet?.boxOffice || "...."}</div>
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">
                          original Country
                        </td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.originalCountry || "...."}
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">
                          original Language
                        </td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.originalLanguage}
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">
                          subtitle Languages
                        </td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.subtitleLanguages || "...."}
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">studios</td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.studios?.map((studio) => (
                            <div key={studio.id}>
                              <p>{studio?.name}</p>
                            </div>
                          )) || "...."}
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">awards</td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.awards !== null
                            ? moviedet?.awards.map((award) => (
                                <div key={award.id} className="py-2">
                                  <p>{award?.name}</p>
                                  <p className=" text-blue-200">
                                    {award?.category} ({award.year})
                                  </p>
                                </div>
                              ))
                            : "...."}
                        </td>
                      </tr>
                      <tr className=" border-neutral-700 border-b-2">
                        <td className="text-left capitalize py-4 ">
                          content Ratings
                        </td>
                        <td className="text-right capitalize py-4 ">
                          {moviedet?.contentRatings?.map((rating) => (
                            <div key={rating.id}>
                              <p cl>{rating?.name || "...."}</p>
                              <p className="mb-2 text-blue-200">
                                {rating?.description || "...."} (
                                {rating.country})
                              </p>
                            </div>
                          )) || "...."}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-white w-full pt-5 px-3 font-Roboto  ">
                  <div className="md:px-5 flex flex-row my-5 max-w-full overflow-x-hidden items-center justify-center flex-wrap gap-4  relative scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
                    {moviedet?.characters?.map(
                      (cast) => (
                        console.log(cast),
                        (
                          <div
                            key={cast.id}
                            className="flex gap-1 min-w-[9rem] md:min-w-[10rem] max-w-[9rem] md:max-w-[10rem] h-full items-center text-center flex-col mx-1"
                          >
                            <LazyLoadImage
                              effect="blur"
                              src={
                                cast.image === ""
                                  ? cast.personImgURL || noImage
                                  : cast.image
                              }
                              className="w-full h-full rounded-xl"
                            />
                            <p className="text-white">{cast.name || "..."}</p>
                            <p className="text-blue-300">
                              ({cast.peopleType || "..."})
                            </p>
                          </div>
                        )
                      )
                    ) || (
                      <div className="text-2xl text-red-400 font-bold">
                        Not Available
                      </div>
                    )}
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
                      )) || (
                        <div className="text-2xl text-red-400 font-bold">
                          Not Available
                        </div>
                      )
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-white w-full pt-5 px-3 font-Roboto  ">
                  <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
                    {moviedet?.artworks?.map((artwork) => (
                      <LazyLoadImage
                        effect="blur"
                        alt={artwork?.name}
                        width={artwork.width}
                        height={artwork.height}
                        className="img object-cover w-96 h-96  rounded-xl m-2"
                        src={artwork?.thumbnail || noImage}
                      />
                    )) || (
                      <div className="text-2xl text-red-400 font-bold">
                        Not Available
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="text-white w-full pt-5 px-3 font-Roboto  ">
                  <div className="flex justify-center items-center mb-10 gap-5 flex-wrap">
                    {Object.values(moviedet?.companies)
                      .flat()
                      .map((company) => (
                        <div
                          key={company.id}
                          className="flex  flex-col items-center gap-2"
                        >
                          <div className="bg-gray-800 w-48 h-48 p-2 flex justify-center flex-col items-center gap-2 rounded-xl">
                            <h1 className="text-white text-center  font-bold">
                              {company.name}
                            </h1>
                            <p className="text-blue-300">
                              {company?.companyType?.companyTypeName}
                            </p>
                          </div>
                        </div>
                      )) || (
                      <div className="text-2xl text-red-400 font-bold">
                        Not Available
                      </div>
                    )}
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </>
      )}
    </>
  );
};
