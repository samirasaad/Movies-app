import { useState } from "react";
import axiosInstance from "../../Api/Axios";
import SearchInpt from "../../Components/SearchInpt/SearchInpt";
import { useDebounce } from "react-use";
import { useInfiniteScroll } from "../../Hooks/InfiniteScroll";
import MoviesList from "../../Components/Movies/MoviesList/MoviesList";
import "./Home.css";

const fetchMovies = async (page = 1, srchTrm = "") => {
  const url = srchTrm
    ? "search/movie?sort_by=popularity.desc&page=" + page
    : "discover/movie?sort_by=popularity.desc&page=" + page;

  const params = srchTrm ? { params: { query: srchTrm } } : {};

  try {
    const response = await axiosInstance.get(url, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function Home() {
  const [searchTrm, setSearchTrm] = useState("");
  const [debouncedSearchTrm, setDebouncedSearchTrm] = useState("");

  // Debounce search term and update debouncedSearchTrm
  useDebounce(
    () => {
      setDebouncedSearchTrm(searchTrm);
    },
    500,
    [searchTrm]
  );

  const {
    items: movieList,
    isLoading,
    hasMore,
    loaderRef,
  } = useInfiniteScroll(fetchMovies, debouncedSearchTrm);

  // debounce will fire on mounting and search trm change no need for useeffect
  // useEffect(() => {
  //   fetchMovies(searchTrm);
  // }, [searchTrm]);

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
          <MoviesList
            movieList={movieList}
            isLoading={isLoading}
            hasMore={hasMore}
            loaderRef={loaderRef}
          />
          {/* end:: all movies section */}
        </div>
      </main>
    </>
  );
}

export default Home;
