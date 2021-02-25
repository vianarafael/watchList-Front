import  { useState, useEffect, useContext } from 'react';
import { SelectedMovieContext } from '../App';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';
import BannerMain from './BannerMain';
import PageDefault from './PageDefault'

const Details = () => {
    const [filmData, setFilmData] = useState(null)
    const history = useHistory();
    const selectedContext = useContext(SelectedMovieContext)
    const id = selectedContext.state.selectedMovie;
    useEffect(() => {
    
         const  getMovieData = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${env.KEY}&append_to_response=videos,credits`)
            setFilmData(response.data);
        }
        getMovieData();

    }, [])
    const addToWatchList = async () => {
        const response = await axios.post(`/addMovie/${id}`, null,  { params: {
            token: localStorage.token
            }
          });
        // if the user is logged - save that stuff to the database
        console.log(response.data);
    }
    return (
        <PageDefault>
            { id ? ( <>
            {filmData ? (<>
                    <BannerMain
              videoTitle={filmData.title}
              url={filmData.videos.results[0]['key']}
              videoDescription={filmData.overview}
            />
                   { localStorage.logged ? <button onClick={addToWatchList}>Add to WatchList</button> : <p>You must be logged to add a movie to your watch list</p> }
                </>) : 'loading'}
            </>) : history.push('/')}
        </PageDefault>
    )
}

export default Details;