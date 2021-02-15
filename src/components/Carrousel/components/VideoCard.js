import  { useContext } from 'react';
import { VideoCardContainer } from './styles';

import { SelectedMovieContext } from '../../../App'


function VideoCard({
  videoTitle,
  categoryColor,
  poster,
  id,
  history,
  genres,
}) {


  const selectedContext = useContext(SelectedMovieContext);

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
  const image = `https://image.tmdb.org/t/p/w200/${poster}`;
  return (
    <>
      <p style={{ 'textAlign': 'center' }}>{genresString}</p>
      <VideoCardContainer
        onClick={(e) => {
          // setSelectedMovie(id);
          // history.push('./details');
          selectedContext.dispatch({type: 'set_selected_movie', payload: id });
          console.log(selectedContext.state);
        }}
        
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
