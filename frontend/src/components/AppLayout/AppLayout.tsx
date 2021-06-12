import React from "react";
import "antd/dist/antd.css";

import "./AppLayout.scss";

interface AppLayoutProps {}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return <section className="app-layout">{children}</section>;
};

export default AppLayout;
