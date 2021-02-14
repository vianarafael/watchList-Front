import React from 'react';
import { VideoCardContainer } from './styles';


function VideoCard({
  videoTitle,
  categoryColor,
  poster,
  id,
  history,
  genres,
}) {
  let genresString = '';

  if (genres) {
    for (let i = 0; i < 2; i++) {
      genresString += genres[i];
      if (genres.length === 1) break;
      if (i < 1) {
        genresString += ' | ';
      }
    }
  }
  let time;
  const image = `https://image.tmdb.org/t/p/w200/${poster}`;
  return (
    <>
      <p style={{ 'text-align': 'center' }}>{genresString}</p>
      <VideoCardContainer
        // onMouseEnter={() => {
        //   time = setTimeout(() => {
        //     setSelectedMovie(id);

        //     history.push('./details');
        //   }, 4000);
        // }}
        // onMouseLeave={() => {
        //   clearTimeout(time);
        // }}
        // onClick={() => {
        //   setSelectedMovie(id);
        //   history.push('./details');
        // }}
        url={image}
        target="_blank"
        style={{ borderColor: categoryColor || 'red' }}
        title={videoTitle}
        genres={genres}
      />
    </>
  );
}





export default VideoCard;