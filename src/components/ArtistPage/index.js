import React from 'react'
import './style.css'
import { withRouter } from 'react-router'
import AlbumModal from '../AlbumModal';

const Album = ({ img, name, id, year, openModal }) => {
    return <div className='album' style={{ backgroundImage: `url(${img})` }}
        onClick={() => openModal()}>
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
        headerVisible: false,
        name: '',
        genre: '',
        showModal: false
    }
    openModal = () => {
        console.log('req')
        this.setState({ showModal: true })
    }
    closeModal = () => {
        this.setState({ showModal: false })
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
                        year: Number(item.releaseDate.slice(0, 4))
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
    onScroll = e => {
        if (e.target.scrollTop > 90 && !this.state.headerVisible) {
            this.setState({ headerVisible: true })
        } else if (e.target.scrollTop <= 90 && this.state.headerVisible) {
            this.setState({ headerVisible: false })
        }
    }
    componentDidMount() {
        let artistID = this.props.location.search.slice(10)
        this.fetchAlbums(artistID)
    }
    render() {
        return < div className='artist-page' onScroll={this.onScroll} >
            <div className='artist-page__info' ref={info => this.info = info}>
                <div className='artist-page__info__name'>{this.state.name}</div>
                <div className='artist-page__info__genre'>{this.state.genre}</div>
            </div>
            {this.state.headerVisible && <div className='artist-page__info' style={{ position: 'absolute', top: 0 }}>
                <div className='artist-page__info__name'>{this.state.name}</div>
                <div className='artist-page__info__genre'>{this.state.genre}</div>
            </div>}
            <div className='artist-albums'>
                {this.state.albums.map(album => {
                    return <Album key={album.id}
                        name={album.name} img={album.img} year={album.year}
                        openModal={this.openModal} />
                })}
            </div>
            <div className='artist-videos'>
            </div>
            {this.state.showModal && <AlbumModal closeModal={this.closeModal}>
            </AlbumModal>}
        </div>
    }
})

export default ArtistPage