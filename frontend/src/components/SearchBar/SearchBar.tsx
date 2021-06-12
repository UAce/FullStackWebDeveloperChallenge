import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction
} from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import "./SearchBar.scss";
import { Input, message, Tooltip } from "antd";
import { addWord, removeMostSimilarWord } from "../../common/api";

interface SearchBarProps {
  word: string;
  setWord: Dispatch<SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ word, setWord }) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const onAddClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await addWord(word);
      setWord("");
      message.success({
        content: `Successfully added '${word}' to the search corpus`,
        className: "success"
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const onRemoveClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await removeMostSimilarWord(word);
      setWord("");
      setWord(word); // a hack to refresh the search result
      message.success({
        content: `Successfully removed the most similar word to '${word}' from the search corpus`,
        className: "success"
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar-content">
        <div className="search-bar-search">
          <Input
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
          <a className="search-bar-action-button" onClick={onAddClick}>
            <Tooltip placement="bottom" title="Add word to the search corpus">
              <PlusOutlined style={{ fontSize: "20px", color: "#fff" }} />
            </Tooltip>
          </a>
          <a className="search-bar-action-button" onClick={onRemoveClick}>
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
