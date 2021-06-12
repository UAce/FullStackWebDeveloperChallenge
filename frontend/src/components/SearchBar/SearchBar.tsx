import React, {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState
} from "react";
import { PlusSquareTwoTone, MinusSquareTwoTone } from "@ant-design/icons";

import "./SearchBar.scss";
import { Input } from "antd";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const searchBarContainerRef = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLDivElement
  >;
  const searchResultsRef = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLDivElement
  >;
  const [word, setWord] = useState<string>("");
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 1) {
      searchBarContainerRef.current.style.borderBottomLeftRadius = "0";
      searchBarContainerRef.current.style.borderBottomRightRadius = "0";
      searchResultsRef.current.className = "search-bar-results-wrapper";
    } else {
      searchBarContainerRef.current.style.borderBottomLeftRadius = "18px";
      searchBarContainerRef.current.style.borderBottomRightRadius = "18px";
      searchResultsRef.current.className = "search-bar-results-wrapper hidden";
    }
    setWord(e.target.value);
  };

  useEffect(() => {
    // Todo
    console.log(`search ${word}`);
  }, [word]);
  return (
    <div className="search-section">
      <div className="search-bar" ref={searchBarContainerRef}>
        <div className="search-bar-content">
          <div className="search-bar-search">
            <Input
              placeholder="type something..."
              defaultValue={word}
              type="text"
              autoFocus
              style={{ outline: "none" }}
              onChange={onInputChange}
            />
          </div>
          <div className="search-bar-actions">
            <a>
              <PlusSquareTwoTone style={{ fontSize: "25px", color: "#08c" }} />
            </a>
            <a>
              <MinusSquareTwoTone style={{ fontSize: "25px", color: "#08c" }} />
            </a>
          </div>
        </div>
      </div>
      <div className="search-bar-results-wrapper hidden" ref={searchResultsRef}>
        <div className="search-bar-results">
          <h2>Most Similar Words</h2>
          <ul>
            <li>word1</li>
            <li>word2</li>
            <li>word3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
