import React, { useState, useEffect } from 'react';
import { VideoCardGroupContainer, Title } from './styles';
import VideoCard from './components/VideoCard';

import Slider, { SliderItem } from './components/Slider';

function Carousel({ color, title, films }) {
  const categoryTitle = title;
  const categoryColor = color;
  const [genres, setGenres] = useState([]);
  // hacky - removing the film that has no videos
  if (films) {
    films = films.filter((film) => film.id !== 19404);
  }

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=e576111d75dee905a12167d6f1387f71&language=en-US'
    )
      .then((res) => res.json())
      .then((res) => setGenres(res.genres));
  }, [setGenres]);

  const genreConverter = {};
  if (genres) {
    genres.forEach((genre) => {
      genreConverter[genre.id] = genre.name;
    });
  }

  return (
    <VideoCardGroupContainer>
      {categoryTitle && (
        // <>
        <Title style={{ backgroundColor: categoryColor || 'red' }}>
          {categoryTitle}
        </Title>
      )}
      <Slider>
        {films
          ? films.map((film) => (
              <SliderItem key={film.original_title}>
                <VideoCard
                  id={film.id}
                  videoTitle={film.original_title}
                  genres={film.genre_ids.map(
                    (genre_id) => genreConverter[genre_id]
                  )}
                  poster={film.poster_path}
                  categoryColor={categoryColor}
                />
              </SliderItem>
            ))
          : ''}
      </Slider>
    </VideoCardGroupContainer>
  );
}

export default Carousel;