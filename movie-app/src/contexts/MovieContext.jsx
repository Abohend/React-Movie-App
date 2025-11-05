import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites") || "[]")
    );

    // on fav. change => update local storage
    useEffect(() => {
        console.log("fav is set;");
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
        setFavorites((prev) => [...prev, movie]);
    };

    const removeFromFavorites = (id) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== id));
    };

    const isFavorite = (id) => {
        return favorites.some((movie) => movie.id === id);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };
    return (
        <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
    );
};
