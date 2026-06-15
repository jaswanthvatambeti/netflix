import React from 'react';
import Banner from './Banner';
import Navbar from './Navbar';
import Row from './Row';
import './Netflix.css';

export default function Netflix() {
  return (
    <div className="netflix">
      <Navbar />
      <Banner />
      
      <div className="content">
        <Row 
          title="Trending Now" 
          fetchUrl="/trending/all/week" 
          isLarge={true}
        />
        <Row 
          title="Top Rated" 
          fetchUrl="/movie/top_rated" 
        />
        <Row 
          title="Action Movies" 
          fetchUrl="/discover/movie?with_genres=28" 
        />
        <Row 
          title="Comedy Movies" 
          fetchUrl="/discover/movie?with_genres=35" 
        />
        <Row 
          title="Horror Movies" 
          fetchUrl="/discover/movie?with_genres=27" 
        />
        <Row 
          title="Romance Movies" 
          fetchUrl="/discover/movie?with_genres=10749" 
        />
        <Row 
          title="Documentaries" 
          fetchUrl="/discover/movie?with_genres=99" 
        />
      </div>
    </div>
  );
}