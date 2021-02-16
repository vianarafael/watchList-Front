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
        async function getMovieData () {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${env.KEY}&append_to_response=videos,credits`)
            setFilmData(response.data);
        }
        getMovieData();
    })
    return (
        <>
            { id ? ( <>
            {filmData ? (<p>{filmData.title}</p>) : 'loading'}
            </>) : history.push('/')}
        </>
    )
}

export default Details;