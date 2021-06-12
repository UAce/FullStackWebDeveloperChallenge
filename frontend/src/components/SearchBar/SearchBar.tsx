import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef
} from "react";
import { Input, message, Tooltip } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import { addWord, removeMostSimilarWord } from "../../common/api";
import { ISimilarWord } from "../../common/interfaces";
import "./SearchBar.scss";

interface SearchBarProps {
  word: string;
  setWord: Dispatch<SetStateAction<string>>;
  results: ISimilarWord[];
}

const SearchBar: React.FC<SearchBarProps> = ({ word, setWord, results }) => {
  const inputRef = useRef<Input>() as MutableRefObject<Input>;
  const preventDefault = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    inputRef.current.input.focus();
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const onAddClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    preventDefault(e);
    if (word.split(" ").length > 1) {
      return;
    }
    try {
      await addWord(word);
      setWord("");
      message.success({
        content: `Successfully added '${word}' to the search corpus`,
        duration: 2,
        className: "success"
      });
    } catch (error) {
      if (error.response.status === 409) {
        message.warning({
          content: `'${word}' already exists in the search corpus`,
          duration: 2,
          className: "warning"
        });
      }
      const msg = error.response.data?.message || "Failed to add word";
      console.error(msg);
    }
  };

  const onRemoveClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    preventDefault(e);
    if (results.length === 0 || word.split(" ").length > 1) {
      return;
    }
    try {
      const removedWord = await removeMostSimilarWord(word);
      setWord("");
      setWord(word); // hack to refresh the search result
      message.success({
        content: `Successfully removed '${removedWord}' from the search corpus`,
        duration: 2,
        className: "success"
      });
    } catch (error) {
      const msg =
        error.response.data?.message || "Failed to remove most similar word";
      console.error(msg);
    }
  };

  useEffect(() => {
    inputRef.current.input.focus();
  }, []);

  return (
    <div className="search-bar">
      <div className="search-bar-content">
        <div className="search-bar-search">
          <Input
            ref={inputRef}
            placeholder="type something..."
            defaultValue={word}
            value={word}
            type="text"
            autoFocus
            style={{ outline: "none" }}
            onChange={onInputChange}
          />
        </div>
        <div className="search-bar-actions">
          <a
            className={`search-bar-action-button ${
              word.split(" ").length > 1 ? "disabled" : ""
            }`}
            onClick={onAddClick}
          >
            <Tooltip placement="bottom" title="Add word to the search corpus">
              <PlusOutlined style={{ fontSize: "20px", color: "#fff" }} />
            </Tooltip>
          </a>
          <a
            className={`search-bar-action-button ${
              results.length === 0 || word.split(" ").length > 1
                ? "disabled"
                : ""
            }`}
            onClick={onRemoveClick}
          >
            <Tooltip
              placement="bottom"
              title="Remove most similar word from the search corpus"
            >
              <MinusOutlined style={{ fontSize: "20px", color: "#fff" }} />
            </Tooltip>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
