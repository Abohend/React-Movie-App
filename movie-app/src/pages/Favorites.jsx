import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import "../css/Favorites.css";

function Favorites() {
    const { favorites } = useMovieContext();

    return favorites ? (
        <div className="favorites">
            <h2>Your Favorites</h2>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    ) : (
        <div className="favorites-empty">
            <h2>No Favorites Movies, yet.</h2>
            <p>
                Start adding some movies to favorites and they will appear here.
            </p>
        </div>
    );
}

export default Favorites;
