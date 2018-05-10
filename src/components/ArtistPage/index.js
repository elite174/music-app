import React from 'react'
import './style.css'

const Album = ({ img, name, id }) => {
    return <div className='album' style={{ backgroundImage: `url(${img})` }}>
        <div className='album-info'>
            <p>{name}</p>
        </div>
    </div>
}
export default class ArtistPage extends React.Component {
    state = {
        albums: [],
        videos: [],
        headerVisible: false
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
    onScroll = e => {
        console.log(e.target.scrollTop)
        if (e.target.scrollTop > 90 && !this.state.headerVisible) {
            this.setState({ headerVisible: true })
        } else if (e.target.scrollTop <= 90 && this.state.headerVisible) {
            this.setState({ headerVisible: false })
        }
    }
    componentDidMount() {
        this.fetchAlbums()
    }
    render() {
        let { name, genre, id } = this.props
        return < div className='artist-page' onScroll={this.onScroll} >
            <div className='artist-page__info' ref={info => this.info = info}>
                <div className='artist-page__info__name'>{name}</div>
                <div className='artist-page__info__genre'>{genre}</div>
            </div>
            {this.state.headerVisible && <div className='artist-page__info' style={{ position: 'absolute', top: 0 }}>
                <div className='artist-page__info__name'>{name}</div>
                <div className='artist-page__info__genre'>{genre}</div>
            </div>}
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