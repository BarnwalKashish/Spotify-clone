import React from "react";
import "./sidebarButton.css";

export default function SidebarButton({ title, isActive, onClick }) {
  return React.createElement(
    "div",
    {
      className: `button ${isActive ? "active" : ""}`,
      onClick: onClick
    },
    React.createElement(
      "div",
      { className: "button-content" },
      React.createElement("p", null, title)
    )
  );
}
