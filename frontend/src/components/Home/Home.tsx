import React from "react";

import AppLayout from "../AppLayout/AppLayout";
import SearchBar from "../SearchBar/SearchBar";
import Title from "../Title/Title";
import "./Home.scss";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <AppLayout>
      <div className="search-wrapper">
        <Title />
        <SearchBar />
      </div>
    </AppLayout>
  );
};

export default Home;
