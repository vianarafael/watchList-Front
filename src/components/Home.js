import { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';

import MySlider from './MySlider'



const Home = () => {
    const [upcoming, setUpcoming] = useState([]);

    useEffect(() => {
        const getMovies = async() => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${env.KEY}&language=en-US&page=1`);
            setUpcoming(response.data.results);
        }
        getMovies()
    }, [])
    return <MySlider movies={upcoming} />
};

export default Home;