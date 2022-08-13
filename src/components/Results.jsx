import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/video") {
        getResults(`/search/q=${searchTerm} video`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, location.pathname]);

  console.log(results);

  if (isLoading) {
    return <Loading />;
  }

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-5 sm:px-56">
          {results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    case "/image":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              className="sm:p-3 p-5"
              href={href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-5 sm:px-56 items-center">
          {results?.map(({ source, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a
                href={source?.href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg  dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <div className="felx gap-4">{source?.href}</div>
              </a>
            </div>
          ))}
        </div>
      );

    case "/video":
      return (
        <div className="flex flex-wrap">
          {results?.map((video, index) => (
            <div key={index} className="p-2">
              {video?.additional_links?.[0]?.href.includes("watch?v=") && (
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  controls
                  width="300px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </div>
      );

    default:
      return "ERROR!";
  }
};
