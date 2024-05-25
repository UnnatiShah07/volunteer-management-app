import { FC } from "react";
import { Link } from "react-router-dom";
import { SiGithub } from "react-icons/si";

export const Header: FC = () => {
  return (
    <div className="header">
      <h3>Volunteer Management</h3>
      <div className="links">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/volunteer">
          Volunteer
        </Link>
        <Link className="link" to="/events">
          Event
        </Link>
        <a href="" target="_blank" rel="noreferrer" className="code-link">
          <SiGithub />
        </a>
      </div>
    </div>
  );
};
