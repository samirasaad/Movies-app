import React, { useEffect, useState } from "react";
import SearchInpt from "./SearchInpt/SearchInpt";
import "./Home.css";
import axiosInstance from "../../Network/Api/Axios";
import Spinner from "../SharedUi/Spinner/Spinner";
import MovieCard from "../MovieCard/MovieCard";

function Home() {
  const [searchTrm, setSearhTrm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        "discover/movie?sort_by=popularity.desc"
      );
      console.log(response.data.results);
      setMovieList(response.data.results);
    } catch (error) {
      setMovieList([]);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="hero-bg">
        <nav className="flex justify-center pt-20 py-5">
          <img src="logo.svg" alt="Logo" width="200" height="200" />
        </nav>
        <div className="warapper">
          <header>
            {/*begin:: hero section */}
            <img src="hero-bg.png" alt="Hero Background" />
            <h1 className=" text-sky-50 ">
              Find{" "}
              <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
                Movies
              </span>
              You'll Enjoy Without the Hassle{" "}
            </h1>
            {/*end:: hero section */}

            {/*begin:: search section */}
            <SearchInpt searchTrm={searchTrm} setSearhTrm={setSearhTrm} />
            {/*end:: search section */}
          </header>

          {/* begin:: all movies section */}
          <section className="all-movies m-10">
            <h3 className="mt-10 text-[2.1rem] text-white font-semibold">
              All Movies
            </h3>
            {isLoading ? (
              <Spinner />
            ) : movieList.length > 0 ? (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            ) : (
              <p className="no-movies-text">No movies found.</p>
            )}
          </section>
          {/* end:: all movies section */}
        </div>
      </main>
    </>
  );
}

export default Home;
