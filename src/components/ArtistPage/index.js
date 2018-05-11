import React from 'react'
import './style.css'
import { withRouter } from 'react-router'

const Album = ({ img, name, year }) => {
    return <div className='album' style={{ backgroundImage: `url(${img})` }}>
        <div className='album-info'>
            <div>{name}</div>
            <div>{year}</div>
        </div>
    </div>
}
const ArtistPage = withRouter(class ArtistPage extends React.Component {
    state = {
        albums: [],
        videos: [],
        headerVisible: false
    }
    async fetchAlbums(id) {
        let response = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=album`)
        if (response.status === 200) {
            let data = await response.json()
            console.log(data)
            let albums = []
            data.results.map(item => {
                if (item.wrapperType !== 'artist') {
                    albums.push({
                        id: item.collectionId,
                        name: item.collectionName,
                        img: item.artworkUrl100,
                        year: item.releaseDate.slice(0, 4)
                    })
                }
            })
            this.setState({
                albums: albums,
                name: data.results[0].artistName,
                genre: data.results[0].primaryGenreName
            })

        }
    }
    componentDidMount() {
        if (this.props.location.search !== '' && this.props.location.search.indexOf('?artistID=') === 0) {
            this.fetchAlbums(this.props.location.search.slice(10))
        }

    }
    render() {
        return <div className='artist-page'>
            <div className='artist-page__info' ref={info => this.info = info}>
                <div className='artist-page__info__name'>{this.state.name}</div>
                <div className='artist-page__info__genre'>{this.state.genre}</div>
            </div>
            <div className='artist-albums'>
                {this.state.albums.sort((a, b) => { return a.year > b.year }).map(album => {
                    return <Album key={album.id} name={album.name} img={album.img} year={album.year} />
                })}
            </div>
            <div className='artist-videos'>
            </div>
        </div>
    }
})

export default ArtistPage