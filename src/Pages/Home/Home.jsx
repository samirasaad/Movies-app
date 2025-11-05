import React, { useEffect, useState } from "react";
import axiosInstance from "../../Network/Api/Axios";
import Spinner from "../../Components/SharedUi/Spinner/Spinner";
import MovieCard from "../../Components/MovieCard/MovieCard";
import SearchInpt from "../../Components/SearchInpt/SearchInpt";
import "./Home.css";
import NoDataFound from "../../Components/SharedUi/NoDataFound/NoDataFound";
import { useDebounce } from "react-use";

function Home() {
  const [searchTrm, setSearchTrm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  // optimzing search input with debounce
  useDebounce(()=>{
    fetchMovies(searchTrm);
  },500,[searchTrm]);


  // debounce will fire on mounting and search trm change no need for useeffect
  // useEffect(() => {
  //   fetchMovies(searchTrm);
  // }, [searchTrm]);

  const fetchMovies = async (srchTrm ='') => {
    const url = srchTrm
      ? "search/movie?sort_by=popularity.desc"
      : "discover/movie?sort_by=popularity.desc";

    const params = srchTrm ? { params: { query: srchTrm } } : {};

    try {
      setIsLoading(true);
      setMovieList([]);
      const response = await axiosInstance.get(url, params);
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
        {/* begin:: navigation */}
        <nav className="flex justify-center pt-20 py-5">
          <img src="logo.svg" alt="Logo" width="200" height="200" />
        </nav>
        {/* end:: navigation */}
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
            <SearchInpt searchTrm={searchTrm} setSearchTrm={setSearchTrm} />
            {/*end:: search section */}
          </header>

          {/* begin:: all movies section */}
            <h3 className="text-center my-10 text-[2.1rem] text-white font-semibold">
              All Movies
            </h3>
          <section className="all-movies m-10 w-2/3 m-auto">
            {isLoading ? (
              <Spinner />
            ) : movieList.length > 0 ? (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            ) : (
              <NoDataFound/>
            )}
          </section>
          {/* end:: all movies section */}
        </div>
      </main>
    </>
  );
}

export default Home;
