import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import style from 'styled-components';


// I have to break that problem down into manageable chunks
const Container = style.div`
  heigth 100px;
  width: 80px;
  margin: 1rem;
`

const Poster =  style.img`
heigth 100px;
width: 80px;
margin: 1rem;
`

const MySlider = ({movies}) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  
    return (
        <div>
        <h2> Multiple items </h2>
        <Slider {...settings}>
          {movies ? movies.map(movie => {
            console.log(movie)
              return (<Container>
                  <h3></h3>
                  <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              </Container>)
          }) : "" }
         
        </Slider>
      </div>
    )
}

export default MySlider;