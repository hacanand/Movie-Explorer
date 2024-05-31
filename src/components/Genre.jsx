import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import {Helmet} from "react-helmet";

function Genre() {
    const { fetchGenre, activegenre, setActiveGenre, genres} = useContext(Contextpage);    


    useEffect(() => {
        fetchGenre();  // Fetching Genres on Initial Render.
    }, [])

    return (
        <>
        <Helmet>
            <title>Movie Explorer | Genres</title>
        </Helmet>

        <div className='flex flex-wrap justify-center px-2'>
            {
                genres.map((genre) => (

                    <button
                        onClick={() => setActiveGenre(genre.id)}
                        className={activegenre === genre.id ? 'active px-4 py-2 m-2 text-[15px] text-white font-semibold rounded-3xl' : 'px-4 py-2 m-2 text-[15px] bg-slate-800 text-white font-semibold rounded-3xl'} key={genre.id}>
                        {genre.name}
                    </button>

                ))
            }
            </div>
            </>
    )
}

export default Genre
