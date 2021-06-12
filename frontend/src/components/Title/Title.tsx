import React from "react";

import "./Title.scss";

interface TitleProps {}

const Title: React.FC<TitleProps> = () => {
  return (
    <div className="title">
      <h1>Hemingway Search</h1>
    </div>
  );
};

export default Title;
