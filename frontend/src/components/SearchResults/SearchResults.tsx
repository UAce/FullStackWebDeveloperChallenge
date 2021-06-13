import { SearchOutlined } from "@ant-design/icons";
import React, { MutableRefObject, useRef } from "react";

import { ISimilarWord } from "../../common/interfaces";
import "./SearchResults.scss";

interface SearchResultsProps {
  results: ISimilarWord[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const searchResultsRef = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLDivElement
  >;
  return (
    <div className="search-bar-results-wrapper" ref={searchResultsRef}>
      <div className="search-bar-results">
        <h2>Most Similar Words</h2>
        {results.length > 0 ? (
          <ul id="searchResultList">
            {results.map((result: ISimilarWord, index: number) => {
              return index < 3 ? (
                <li key={result.target}>
                  <SearchOutlined />
                  {result.target}
                </li>
              ) : (
                <></>
              );
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
