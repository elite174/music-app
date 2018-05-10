import React from 'react'
import './style.css'


const ArtistRow = ({ name, genre, changePage, id }) => {
    return <div className='artist-row' onClick={() => changePage('artist', name, genre, id)}>
        <div>
            <div className='artist-row__name'>{name}</div>
            <div className='artist-row__genre'>{genre}</div>
        </div>
        <div>
            <i className='material-icons artist-row__arrow'>arrow_forward_ios</i>
        </div>
    </div>
}

export default class SearchPage extends React.Component {

    state = {
        value: '',
        artists: []
    }
    async fetchArtists() {
        let response = await fetch(`https://itunes.apple.com/search?term=${this.state.value}&media=music&entity=musicArtist`)
        if (response.status === 200) {
            let data = await response.json()
            console.log(data)
            let artists = []
            data.results.map(item => {
                artists.push({
                    artistName: item.artistName,
                    genre: item.primaryGenreName,
                    id: item.artistId
                })
            })
            this.setState({ artists })
        }
    }
    render() {
        return (
            <div className='search-page'>
                <div className='search-bar'>
                    <input type='text' value={this.state.value}
                        placeholder='Search for artists...'
                        onChange={e => {
                            this.setState({ value: e.target.value })
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter' || e.keyCode === 13) {
                                this.fetchArtists()
                            }
                        }} /><i className="material-icons search-icon">search</i>

                </div>
                {this.state.artists.length > 0 &&
                    <div className='search-text'>
                        <span>Found</span>
                        <span>{this.state.artists.length}</span>
                        <span>artists</span>
                    </div>
                }
                <div className='search-artists'>
                    {this.state.artists.map(artist => {
                        return <ArtistRow key={artist.id} id={artist.id}
                            name={artist.artistName} genre={artist.genre}
                            changePage={this.props.changePage} />
                    })}
                    {this.state.artists.length === 0 && <p>There are no artists</p>}
                </div>
            </div>
        )
    }
}