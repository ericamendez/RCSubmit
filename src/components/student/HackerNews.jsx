import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchHackerNews from "../request/fetchHackerNews";

const HackerNews = () => {
  const results = useQuery({
    queryKey: ['hackernews'], 
    queryFn: fetchHackerNews
  })

  if(results.isLoading){
    return <div>Loading...321 👾</div>
  }

  const news = results.data

  return (
    <section className="hackerContainer">
      <h3>HackerNews Updates</h3>
      <ul>
        {news.map((article, index) => {
          return (
            <li key={index}>
              <a href={article.url} target="_blank">
                {article.title}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default HackerNews;
