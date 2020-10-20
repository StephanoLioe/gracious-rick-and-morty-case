import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

interface INav {
  to: string;
  title: string;
  icon: string;
  color?: string;
}

const Nav: React.FC<INav> = ({ to, title, icon, color = "transparent" }) => {
  return (
    <NavLink
      exact
      to={to}
      className="nav"
      activeClassName="nav-active"
      style={{ borderLeftColor: color }}
    >
      <img src={icon} alt={""} className="nav-img" />
      <div className="nav-title">{title}</div>
    </NavLink>
  );
};

export const Navigation = () => {
  return (
    <div className="navigation">
      <Nav
        to="/dimensions"
        title="Dimensions"
        icon="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        color="green"
      />
      <Nav
        to="/episodes"
        title="Episodes"
        icon="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        color="pink"
      />
    </div>
  );
};
