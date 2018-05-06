import React from 'react'
import './style.css'

const Album = ({ img, name, id }) => {
    return <div className='album' style={{ backgroundImage: `url(${img})` }}>
        <p>{name}</p>
    </div>
}
export default class ArtistPage extends React.Component {
    state = {
        albums: [],
        videos: []
    }
    async fetchAlbums() {
        let response = await fetch(`https://itunes.apple.com/lookup?id=${this.props.artistId}&entity=album`)
        if (response.status === 200) {
            let data = await response.json()
            console.log(data)
            let albums = []
            data.results.map(item => {
                if (item.wrapperType !== 'artist') {
                    albums.push({
                        id: item.collectionId,
                        name: item.collectionName,
                        img: item.artworkUrl100
                    })
                }
            })
            this.setState({ albums: albums })

        }
    }
    componentDidMount() {
        this.fetchAlbums()
    }
    render() {
        let { name, genre, id } = this.props
        return < div className='artist-page' >
            <p>{name}</p>
            <p>{genre}</p>
            <div className='artist-albums'>
                {this.state.albums.map(album => {
                    return <Album key={album.id} name={album.name} img={album.img} />
                })}
            </div>
            <div className='artist-videos'>
            </div>
        </div>
    }
}