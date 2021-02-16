import  { useState, useEffect, useContext } from 'react';
import { SelectedMovieContext } from '../App';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';

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

    })
    const addToWatchList = async () => {
        console.log('da token', localStorage.token)
        const response = await axios.post(`/addMovie/${id}`, null,  { params: {
            token: localStorage.token
            }
          });
        // if the user is logged - save that stuff to the database
        console.log(response.data);
    }
    return (
        <>
            { id ? ( <>
            {filmData ? (<>
                    <p>{filmData.title}</p>
                    <button onClick={addToWatchList}>Add to WatchList</button>
                </>) : 'loading'}
            </>) : history.push('/')}
        </>
    )
}

export default Details;