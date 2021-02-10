import { useState, useEffect } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import Carrousel from './Carrousel'

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
    console.log(upcoming)
    return <div>
        {upcoming ? (<Carrousel       color={'red'}
        title="Upcoming"
        films={upcoming} />) : "loading"}
    </div>
};

export default Home;