import { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv'

const Home = () => {
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        const getMovies = async() => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${env.KEY}&language=en-US&page=1`);
            console.log(response)
            setUpcoming(response.data.results);
        }
        getMovies()
    }, [])
    return <ul>{upcoming.length ? upcoming.map(film => <li key={film.id}>{film.title}</li>) : ''}</ul>
};

export default Home;