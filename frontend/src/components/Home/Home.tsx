import React, {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState
} from "react";
import { Alert } from "antd";

import AppLayout from "../AppLayout/AppLayout";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Title from "../Title/Title";
import { ISimilarWord } from "../../common/interfaces";
import "./Home.scss";
import { getSimilarWords } from "../../common/api";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [word, setWord] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ISimilarWord[]>([]);
  const searchSectionRef = useRef<HTMLDivElement>() as MutableRefObject<
    HTMLDivElement
  >;

  useEffect(() => {
    const asyncGetSimilarWords = async (word: string) => {
      const similarWords = await getSimilarWords(word);
      setSearchResults(similarWords);
    };
    if (word.length > 1) {
      searchSectionRef.current.className = "search-section active";
      asyncGetSimilarWords(word);
    } else {
      searchSectionRef.current.className = "search-section";
    }
  }, [word]);
  return (
    <AppLayout>
      <div className="search-wrapper">
        <Title />
        <div className="search-section" ref={searchSectionRef}>
          <SearchBar word={word} setWord={setWord} />
          <SearchResults results={searchResults} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
