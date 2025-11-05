import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./MovieCard.css";

const MovieCard = ({
  movie: {
    title,
    vote_average,
    vote_count,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  return (
    <div className="movie-card">
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
      ) : (
        <div className="no-poster-wrapper flex justify-center items-center">
          <img src={`/no-pictures.png`} alt={title}/>
        </div>
      )}
      <div className="mt-10">
        <h3 className="truncate capitalize">{title}</h3>

        <div className="content ">
          <div className="rating">
            <FontAwesomeIcon
              icon={faStar}
              color="#ffe500"
              className="text-lg"
            />
            <p>
              {vote_average ? vote_average.toFixed(1) : "N/A"} ({vote_count})
            </p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
