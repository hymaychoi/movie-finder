import React from "react";
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import '../css/home.css'

function Movie( {id, coverImg, title, genres} ) {
    return (
    <div className="item">
        <ul className="item_genres">
            {/* only show first 3 genres in genres arr */}
            {genres.filter((genre, i)=>i<4).map(genre=><li>{genre}</li>)}
        </ul>
        <Link className='item-detail-link' 
                  to={`/movie/${id}`} 
                  style={{textDecoration:'none'}}>
            <img src={coverImg} alt={title}/>
            <h2>{title}</h2>
        </Link>
    </div>)
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie