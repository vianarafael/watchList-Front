import { useEffect } from "react";
import axios from "axios";

const Dashboard = ({name}) => {
    // I have the user id on localStorage

    // I will access the movies from the database using the user's id

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
          console.log(getMovies);
        }
      }

      getUserData();
    })
    return ( 
    <>
      <h1>Dashboard</h1>
      <h3>Welcome </h3>
      <button onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
      }
    }>Clear Local Storage</button>
    </>
    )
}
export default Dashboard;