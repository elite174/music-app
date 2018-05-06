import React from 'react'
import './style.css'

const Album = ({ img, name, id }) => {
    return <div className='album'>
        <p>{name}</p>
    </div>
}
export default class ArtistPage extends React.Component {
    state = {
        albums: [],
        videos: []
    }
    render() {
        let { name, genre, id } = this.props
        return < div className='artist-page' >
            <p>{name}</p>
            <p>{genre}</p>
            <div className='artist-albums'>
                {this.state.albums.map(album => {
                    return <Album name={album.name} img={album.img} />
                })}
            </div>
            <div className='artist-videos'>
            </div>
        </div>
    }
}