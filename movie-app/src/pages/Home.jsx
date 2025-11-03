import { useState } from "react";
import MovieCard from "../components/MovieCard";
import '../css/Home.css';

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        { id: 1, title: "John", release_date: "2024" },
        { id: 2, title: "Fractions", release_date: "2022" },
        { id: 3, title: "Weird Things", release_date: "2020" },
    ];

    return (
        <div className="home">
            <form className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for a movie"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
            <div className="movies-grid">
                {movies.map(
                    (movie) =>
                        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                            <MovieCard movie={movie} key={movie.id} />
                        )
                )}
            </div>
        </div>
    );
}

export default Home;
