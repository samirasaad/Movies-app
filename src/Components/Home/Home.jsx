import React, { useEffect, useState } from "react";
import SearchInpt from "./SearchInpt/SearchInpt";
import axiosInstance from "../../Network/Axios";
import "./Home.css";

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
        "discover/movie/sort_by=popularity.desc"
      );
      console.log(response);
      setMovieList(response.data.results);
    } catch (error) {
      setIsLoading(false);
      setMovieList([]);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="hero-bg">
      <div className="warapper">
        <header>
          <img src="./public/hero-bg.png" alt="Hero Background" />
          <h1 className=" text-sky-50 ">
            Find{" "}
            <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
              Movies
            </span>
            You'll Enjoy Without the Hassle{" "}
          </h1>
          <SearchInpt searchTrm={searchTrm} setSearhTrm={setSearhTrm} />
        </header>
        <section className="all-movies"></section>
      </div>
    </main>
  );
}

export default Home;
