import { NavLink } from "react-router-dom";
import { Button } from "./button";

// eslint-disable-next-line react/prop-types
export const Link = ({ href, children }) => {
  return (
    <span>
      <NavLink to={href}>
        <Button variant={"link"} className="inline">
          {children}
        </Button>
      </NavLink>
    </span>
  );
};
