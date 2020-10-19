import React from "react";

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
