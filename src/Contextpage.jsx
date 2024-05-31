import { createContext, useState, useEffect } from "react";
import axios from "axios";
const Contextpage = createContext();

export function MovieProvider({ children }) {
  const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([]);
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);

  const APIKEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (page < 1) {
      setPage(1); // Increment page to 1 if it is less than 1.
    }
  }, [page]);

  const filteredGenre = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api4.thetvdb.com/v4/movies/filter?country=usa&genre=${activegenre}&lang=eng`,
      headers: {
        Authorization: APIKEY,
      },
    };
    const res = await axios.request(config);

    //  console.log(res)
    setMovies(res.data.data);
    setTotalPage(res.data.page_size);
    setLoader(false);
    setHeader("Genres");
  };

  const fetchSearch = async (query) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api4.thetvdb.com/v4/search?query=${query}&type=movie`,
      headers: {
        Authorization: APIKEY,
      },
    };
    const res = await axios.request(config);
    //console.log(res.data)
    setSearchedMovies(res.data.data);
    setLoader(false);
    setHeader(`Results for "${query}"`);
  };

  const fetchGenre = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://api4.thetvdb.com/v4/genres",
      headers: {
        Authorization: APIKEY,
      },
    };
    const res = await axios.request(config);
    setGenres(res.data.data);
  };
  const fetchTrending = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api4.thetvdb.com/v4/movies?page=${page}`,
      headers: {
        Authorization: APIKEY,
      },
    };

    const res = await axios.request(config);
    setTrending(res.data.data);
    // console.log(res.data.data)
    setTotalPage(res.data.page_size);
    setLoader(false);
    setHeader("Trending Movies");
  };

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        fetchTrending,
        trending,
        totalPage,
        searchedMovies,
      }}
    >
      {children}
    </Contextpage.Provider>
  );
}

export default Contextpage;
