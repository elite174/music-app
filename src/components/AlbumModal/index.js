import React from 'react'
import Modal from '../../containers/ModalContainer';
import './style.css'

const Song = ({ song, isPlaying, play, playedSongId }) => {
    return <div className={isPlaying ? 'song active' : 'song'} onClick={() => { play(song) }}>
        <i className='material-icons song-button'>{!isPlaying ? 'play_arrow' : 'pause'}</i>
        <span className={playedSongId === song.id ? 'song-name active' : 'song-name'}>{song.trackName}</span>
        <div className='view-on-itunes'>
        </div>
    </div>
}
export default class AlbumModal extends React.Component {
    state = {
        songs: [],
        albumName: '',
        songsCount: 0,
        playedSongId: 0,
        paused: false
    }
    componentDidMount() {
        this.fetchSongs()
    }
    play = (song) => {
        if (this.state.playedSongId === song.id) {
            if (this.player.paused) {
                this.player.play()
                this.setState({ paused: false })
            } else {
                this.player.pause()
                this.setState({ paused: true })
            }
        } else {
            this.player.pause()
            this.player.src = song.url
            this.player.play()
            this.setState({
                playedSongId: song.id,
                paused: false
            })
        }
    }
    async fetchSongs() {
        let response = await fetch(`https://itunes.apple.com/lookup?id=${this.props.collectionId}&entity=song`)
        if (response.status === 200) {
            let data = await response.json()
            let songs = []
            for (let i = 1; i < data.results.length; i++) {
                songs.push({
                    id: data.results[i].trackId,
                    itunesView: data.results[i].trackViewUrl,
                    url: data.results[i].previewUrl,
                    trackNumber: data.results[i].trackNumber,
                    trackName: data.results[i].trackName
                })
            }
            this.setState({
                songs,
                albumName: data.results[0].collectionName,
                songsCount: data.results.length - 1
            })
        }
    }
    render() {
        console.log(this.props)
        return <Modal closeModal={this.props.closeModal}>
            <audio hidden ref={player => this.player = player}></audio>
            <div className='album-modal'>
                <div className='album-image-container'>
                    <div className='album-modal__image' style={{ backgroundImage: `url(${this.props.img})` }}></div>
                    <div className='album-modal__info'>
                        <div className='album-modal__info__album-name'>{this.state.albumName}</div>
                        <div className='album-modal__info__tracks-count'>
                            <span className='album-modal__info__count'>{`${this.state.songsCount} `}</span>tracks
                        </div>
                        {this.state.playedSongId !== 0 && <div className='album-modal__info__now-playing'>
                            <i className='material-icons'>music_note</i>
                            <div className='album-modal__info__now-playing__name'>{this.state.songs.find(song => { return song.id === this.state.playedSongId }).trackName}</div>
                        </div>}
                    </div>
                </div>
                <div className='song-list'>
                    {this.state.songs.map(song => {
                        return <Song song={song} key={song.id} play={this.play}
                            playedSongId={this.state.playedSongId}
                            isPlaying={song.id === this.state.playedSongId && !this.state.paused} />
                    })}
                </div>
            </div>
        </Modal>
    }
}