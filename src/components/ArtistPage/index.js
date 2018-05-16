import React from 'react'
import './style.css'
import { withRouter } from 'react-router'
import AlbumModal from '../AlbumModal';

const Album = ({ img, name, id, year, openModal }) => {
    return <div className='album' style={{ backgroundImage: `url(${img})` }}
        onClick={() => openModal(img, id)}>
        <div className='album-info'>
            <div className='album-name'>{name}</div>
            <div className='album-year'>{year}</div>
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
        showModal: false,
        collectionId: undefined
    }
    openModal = (img, collectionId) => {
        this.setState({
            showModal: true,
            img,
            collectionId
        })
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
            albums.sort((a, b) => {
                return a.year > b.year ? 1 : -1
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
                <i className='material-icons back-button' onClick={() => {
                    console.log(this.props)
                    if (this.props.history.length === 2) {
                        this.props.history.push('/')
                    } else {
                        this.props.history.goBack()
                    }
                }}>arrow_back_ios</i>
                <div className='artist-page__info__name'>{this.state.name}</div>
                <div className='artist-page__info__genre'>{this.state.genre}</div>
            </div>
            {this.state.headerVisible && <div className='artist-page__info animated' style={{ position: 'absolute', top: 0 }}>
                <i className='material-icons back-button' onClick={() => {
                    if (this.props.history.length === 2) {
                        this.props.history.push('/')
                    } else {
                        this.props.history.goBack()
                    }
                }}>arrow_back_ios</i>
                <div className='artist-page__info__name'>{this.state.name}</div>
                <div className='artist-page__info__genre'>{this.state.genre}</div>
            </div>}
            <div className='artist-albums'>
                {this.state.albums.map(album => {
                    return <Album key={album.id}
                        id={album.id}
                        name={album.name} img={album.img} year={album.year}
                        openModal={this.openModal} />
                })}
                {this.state.albums.length===0 && <p>There are no albums</p>}
            </div>
            {this.state.showModal && <AlbumModal closeModal={this.closeModal}
                collectionId={this.state.collectionId}
                img={this.state.img}>
            </AlbumModal>}
        </div>
    }
})

export default ArtistPage