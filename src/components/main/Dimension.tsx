import React from "react";
import { useQuery, useQueryCache } from "react-query";
import { useCharacters } from "../../queries/useCharacters";

const DimensionList = () => {
  return <div className="list">Lijst met dimensions</div>;
};

const Content = () => {
  return <div className="content">dit is content</div>;
};

export const Dimension = () => {
  return (
    <div className="main dimension">
      <DimensionList />
      <Content />
    </div>
  );
};
