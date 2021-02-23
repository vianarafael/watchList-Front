import { useEffect, useState } from "react";
import axios from "axios";
import env from 'react-dotenv'
import Carrousel from './Carrousel/index'

const Dashboard = ({name}) => {
  const [watchList, setWatchList] = useState([]);
    useEffect(() => {
      async function getUserData() {
        const authenticationResult = await axios.get("/isAuth", {
          headers: {
            "x-access-token": localStorage.token
          }
        });
        if (authenticationResult.data === "Authenticated") {
          const uid = localStorage.getItem("uid")
          const getMovies = await axios.get(`/movies/${uid}`)
         
          const moviesData = await Promise.all(getMovies.data.rows.map((film) => axios.get(`https://api.themoviedb.org/3/movie/${film.mid}?api_key=${env.KEY}&append_to_response=videos,credits`)
    
          )
        )
        console.log('moviesData', moviesData);
        setWatchList(moviesData);
          }
        }
      getUserData();
    },[])
    console.log('here', watchList.map(film => film.data))
    const displayMovies = () => {
      const theWatchList = watchList.map(film => film.data)
        return <Carrousel  color={"#FFA500"}
            title="Watch List"
            films={theWatchList} />
    }
    console.log(localStorage)
    return ( 
    <>
      <h1>Dashboard</h1>
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