import { useEffect, useState } from "react";
import axios from "axios";
import env from 'react-dotenv'
import Carrousel from './Carrousel/index'
import PageDefault from "./PageDefault";
import { useHistory } from "react-router-dom";

const Dashboard = ({name}) => {
  const history = useHistory();
  const [watchList, setWatchList] = useState([]);
    useEffect(() => {
      console.log(localStorage)
      async function getUserData() {
          const uid = localStorage.getItem("uid")
          const getMovies = await axios.get(`/movies/${uid}`,  {
            headers: {
              "x-access-token": localStorage.token
            }
          });
          let moviesData;
          if (getMovies.data.message === "Authentication failed") {
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
            localStorage.removeItem("logged");
            history.push('/log');
          }
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
      const watchListMovies = watchList.map(film => film.data)
      console.log(watchListMovies)
        return (
                  <Carrousel  color={"#FFA500"}
                    title="Watch List"
                    films={watchListMovies}
                    noRepeat={true}
                    fromDashboard={true}
                    />
                )
    }
    return ( 
    <PageDefault>
      <>
       {watchList ? displayMovies() : 'loading'}
      </>
    </PageDefault>
    )
}
export default Dashboard;