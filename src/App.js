import {useEffect, useState} from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=21965553';

const movie1 ={
    "Title": "Tres metros sobre el cielo",
    "Year": "2010",
    "imdbID": "tt2586634",
    "Type": "movie",
    "Poster": "N/A"
}
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); //searchTerm will be empty at the start

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('Tres metros sobre el cielo');
    }, []);
    return(
        <div className="app">
            <h1>Mundo de peliculas</h1>

            <div className="search">
                <input
                placeholder="Buscar peliculas "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) : ( //if the movie array is empty i see this
                    <div className="empty">
                        <h2>No movies found!</h2>
                    </div>
                )}
        </div>
    );
}
export default App;