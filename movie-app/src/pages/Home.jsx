import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                setMovies(await getPopularMovies());
            } catch (e) {
                console.log(e);
                setError("Failed to load movies!");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);

        const search = async () => {
            try {
                setMovies(await searchMovies(searchQuery));
                setError(null);
            } catch (e) {
                console.log(e);
                setError("Failed to search for movies.");
            }
            finally {
                setLoading(false);
            }
        };
        search();
    }

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSubmit}>
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

            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
