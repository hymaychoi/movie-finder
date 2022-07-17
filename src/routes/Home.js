import { useState, useEffect } from 'react';
import '../css/home.css';
import Movie from '../components/Movie'

function Home(){
  const slider = document.getElementById('slider')
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [mouseDown, setMouseDown] = useState(false)
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  
  const getMovies = async()=>{
    const data = await (await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9.8`)).json()
    console.log(data)
    setMovies(data.data.movies)
    setLoading(false)
  }

  const onMouseDown = (e)=>{
    setMouseDown(true)
    slider.classList.add("active")
    setStartX(e.pageX - slider.offsetLeft) 
    setScrollLeft(slider.scrollLeft)
  }
  
  const onMouseUp = (e)=>{
    setMouseDown(false)
    slider.classList.remove("active")
  }
  
  const onMouseLeave = (e)=>{
    setMouseDown(false)
    slider.classList.remove("active")
  }

  const onMouseMove = (e)=>{
    if(!mouseDown) return
    e.preventDefault()
    const x = e.pageX - slider.offsetLeft
    const walk = (x-startX) * 4
    slider.scrollLeft = scrollLeft - walk;
  }
  useEffect(()=>{
    getMovies()
  }, [])
  
  return (
    <div className="Home">
      <div className='header'>
        <h1 className='title'>Top Rated<span>Movies</span></h1>
      </div>
      <div className='main'>
        {loading ? <iframe src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic" frameBorder="0" className='loading_icon' allowFullScreen></iframe>: 
          <div id='slider'
               className='items' 
               onMouseDown={onMouseDown}
               onMouseUp={onMouseUp}
               onMouseLeave={onMouseLeave} 
               onMouseMove={onMouseMove}>
            {movies.map(movie=> 
              <Movie key={movie.id}
                     id={movie.id}
                     coverImg={movie.medium_cover_image} 
                     title={movie.title} 
                     genres={movie.genres} />)}
          </div>}
      </div>
    </div>
  );
}

export default Home