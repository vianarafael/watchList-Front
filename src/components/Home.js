import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import env from 'react-dotenv';
import Carrousel from './Carrousel'
import PageDefault from './PageDefault'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
    const [upcoming, setUpcoming] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [popular, setPopular] = useState([]);

    const initialState = {selectedMovie: null};

    const reducer = (state, action) => {
        switch(action.type) {
            case "set_selected_movie":
                return {selectedMovie: action.payload};
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const getMovies = async() => {
            const getUpcoming = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${env.KEY}&language=en-US&page=1`);
            setUpcoming(getUpcoming.data.results);

            const getNowPlaying = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${env.KEY}&language=en-US&page=1`);
            setNowPlaying(getNowPlaying.data.results);

            const getTopRated = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${env.KEY}&language=en-US&page=1`);
            setTopRated(getTopRated.data.results);

            const getPopular = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${env.KEY}&language=en-US&page=1`);
            setPopular(getPopular.data.results);
        }
        getMovies()
    }, [])
    return ( 
        <PageDefault>
        {popular && topRated && nowPlaying && upcoming ? (

        <>
       
        <Carrousel  color={"#00c86f"}
            title="Popular"
            films={popular} />
        

        <Carrousel  color={"#9cd33b"}
            title="Top Rated"
            films={topRated} />
            
    
        <Carrousel  color={"#FF0000"}
            title="Now Playing"
            films={nowPlaying} />
            
    
        <Carrousel  color={"#FFA500"}
            title="Upcoming"
            films={upcoming} />
               
                
        </>
        ) : <h1>LOADING</h1> }
        </PageDefault>
    )
};

export default Home;