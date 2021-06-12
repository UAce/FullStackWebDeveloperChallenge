import React, { MutableRefObject, useRef } from "react";

import { ISimilarWord } from "../../common/interfaces";
import "./SearchResults.scss";

interface SearchResultsProps {
  results: ISimilarWord[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  console.log(results);
  const searchResultsRef = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLDivElement
  >;
  return (
    <div className="search-bar-results-wrapper" ref={searchResultsRef}>
      <div className="search-bar-results">
        <h2>Most Similar Words</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((result: ISimilarWord, index: number) => {
              if (index < 3) {
                return <li>{result.target}</li>;
              }
              return <></>;
            })}
          </ul>
        ) : (
          <>No results</>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
