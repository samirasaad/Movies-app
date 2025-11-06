import NoDataFound from "../../SharedUi/NoDataFound/NoDataFound";
import Spinner from "../../SharedUi/Spinner/Spinner";
import MovieCard from "../MovieCard/MovieCard";

function MoviesList({ movieList, isLoading, hasMore, loaderRef }) {
  return (
    <section className="all-movies  w-2/3 m-auto">
      {movieList.length > 0 ? (
        <ul>
          {movieList.map((movie,indx) => (
            <MovieCard key={movie.id + `${indx}`} movie={movie} />
          ))}
        </ul>
      ) : (
        <NoDataFound />
      )}
      {/* loader ref which will check on if exists in viewport [using intersection observer] ? => will fetch more data  */}
      <div ref={loaderRef} className="h-10 my-10">
        {isLoading && <Spinner />}
      </div>

      {!hasMore && (
        <p className="text-center mt-4 text-gray-500">No More Movies</p>
      )}
    </section>
  );
}

export default MoviesList;
