import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchInpt = ({ searchTrm, setSearchTrm }) => {
  return (
    <div className="search">
      <div className=" px-4 flex items-center gap-3  rounded-lg shadow-md">
        <FontAwesomeIcon icon={faSearch} color="#7c4fff" className="text-2xl" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTrm}
          onChange={(e) => setSearchTrm(e.target.value)}
          className="text-xl px-0 font-semibold"
        />
      </div>
    </div>
  );
};
export default SearchInpt;
