import { useEffect, useState } from "react";
import axios from "axios";
import env from 'react-dotenv'

const Dashboard = ({name}) => {
  const [watchList, setWatchList] = useState([]);
    // I have the user id on localStorage

    // I will access the movies from the database using the user's id
    // testing
    useEffect(() => {
      async function getUserData() {
        const authenticationResult = await axios.get("/isAuth", {
          headers: {
            "x-access-token": localStorage.token
          }
        });
        if (authenticationResult.data === "Authenticated") {
          // get the movie data from the DB
          const uid = localStorage.getItem("uid")
          const getMovies = await axios.get(`/movies/${uid}`)
          // now I have the id of the movies - I need to turn this into something more useful
        
          const moviesData = await Promise.all(getMovies.data.rows.map((film) => axios.get(`https://api.themoviedb.org/3/movie/${film.mid}?api_key=${env.KEY}&append_to_response=videos,credits`)
    
          )
        )
        setWatchList(moviesData);
          }
        }
      getUserData();
    })

    const displayMovies = () => {
      return watchList.map(film => (
        <>
          <p>{film.data.title}</p>
        </>
      ))
    }
    return ( 
    <>
      <h1>Dashboard</h1>
      <h3>Welcome </h3>
      <button onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
      }
    }>Clear Local Storage</button>
      <>
       {watchList ? displayMovies() : 'loading'}
      </>
    </>
    )
}
export default Dashboard;