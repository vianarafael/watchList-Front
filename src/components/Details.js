import  { useContext } from 'react';
import { SelectedMovieContext } from '../App';
import { useHistory } from 'react-router-dom';

const Details = () => {
    const history = useHistory();
    const selectedContext = useContext(SelectedMovieContext)
    console.log(selectedContext.state.selectedMovie);
    return (
        <>
            { selectedContext.state.selectedMovie ? (
            <h1>Movies Details</h1>
            ) : history.push('/')}
        </>
    )
}

export default Details;