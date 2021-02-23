import { useEffect, useState } from "react";
import axios from "axios";
import env from 'react-dotenv'
import Carrousel from './Carrousel/index'
import PageDefault from "./PageDefault";

const Dashboard = ({name}) => {
  const [watchList, setWatchList] = useState([]);
    useEffect(() => {
      async function getUserData() {
          const uid = localStorage.getItem("uid")
          const getMovies = await axios.get(`/movies/${uid}`,  {
            headers: {
              "x-access-token": localStorage.token
            }
          });
          let moviesData;
          console.log(getMovies.data)
          if (getMovies.data.auth !== false) {
           moviesData = await Promise.all(getMovies.data.rows.map((film) => axios.get(`https://api.themoviedb.org/3/movie/${film.mid}?api_key=${env.KEY}&append_to_response=videos,credits`)
            )
          )
        } else {
          // redirect to the login page?
        }
        setWatchList(moviesData);
        }
      getUserData();
    },[])

    const displayMovies = () => {
      const theWatchList = watchList.map(film => film.data)
        return <Carrousel  color={"#FFA500"}
            title="Watch List"
            films={theWatchList}
            noRepeat={true}
            />
    }
    console.log(localStorage)
    return ( 
    <PageDefault>
      <h1>Dashboard</h1>
      <button onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
      }
    }>Clear Local Storage</button>
      <>
       {watchList ? displayMovies() : 'loading'}
      </>
    </PageDefault>
    )
}
export default Dashboard;