import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { url: "/search", text: "All 🔎" },
  { url: "/news", text: "News 📰" },
  { url: "/image", text: "Images 📸" },
  { url: "/video", text: "Videos 📺" },
];

export const Links = () => {
  return (
    <div className="flex sm:justify-around justify-between space-x-10 items-center mt-4">
      {links.map(({ url, text }, index) => (
        <NavLink
          key={index}
          to={url}
          // activeClassName="text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2"
          className={({ isActive }) =>
            isActive
              ? "text-blue-700 border-b-2 m-2 mb-0 dark:text-blue-300 border-blue-700 pb-2"
              : "text-gray-700 border-b-2 m-2 mb-0 border-gray-300 pb-2"
          }
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};
