import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/detail.css';

function Detail() {
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState({})
    console.log(movie)

    const getMovie= async()=>{
        const data = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json()
        setMovie(data.data.movie)
        setLoading(false)
    }
    const onClick =()=>{
        console.log("clicked!")
    }
    useEffect(() => {
        getMovie()
    }, [])
    
    return  <>
                {loading ? <div className='loading'><iframe src="https://giphy.com/embed/3o7bu3XilJ5BOiSGic" frameBorder="0" className='loading_icon' allowFullScreen></iframe></div>: 
                <div className='detail'>
                    <a className='close-btn' href='/'>&times;</a>
                    <div className='detail-img'>
                        <img src={movie.large_cover_image} />
                    </div>
                     <div className='detail-info'>
                        <div className='detail-info-title-and-rating'>
                            <h2 className='movie-title'>{movie.title}</h2>
                            <span className='movie-rating'>
                                <div class="stars-outer">
                                    <div class="stars-inner" style={{width: (movie.rating*10)+"%"}}></div>
                                </div>
                            </span>  
                        </div>
                        <div className='detail-info-genre-and-runtime'>
                            <ul className='movie-genres'>{movie.genres.map(genre=><li>{genre}</li>)}</ul>
                            <h5 className='movie-runtime'>{movie.runtime} mins</h5>  
                        </div>
                        <div className='detail-info-summary'>
                            {movie.description_full}
                        </div>
                    </div>
                </div>}
            </> 
}

export default Detail
