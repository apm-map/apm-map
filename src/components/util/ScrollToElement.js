import React from "react";
import Zoom from "@material-ui/core/Zoom";

export default function ScrollToElement(props) {
  const { children, selector } = props;

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      selector
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Zoom in>
      <div onClick={handleClick} role="presentation">
        {children}
      </div>
    </Zoom>
  );
}
