import React from 'react'
import './style.css'
import { withRouter } from 'react-router'
const ArtistRow = ({ name, genre, id, history }) => {
    return <div className='artist-row' onClick={() => history.push(`/albums?artistID=${id}`)}>
        <div>
            <div className='artist-row__name'>{name}</div>
            <div className='artist-row__genre'>{genre}</div>
        </div>
        <div>
            <i className='material-icons artist-row__arrow'>arrow_forward_ios</i>
        </div>
    </div>
}

const SearchPage = withRouter(class SearchPage extends React.Component {
    constructor(props) {
        super(props)
        if (props.location.search !== '' && props.location.search.indexOf('?artist=') === 0) {
            this.state = {
                value: decodeURIComponent(props.location.search.slice(8)),
                artists: []
            }
        } else {
            this.state = {
                value: '',
                artists: []
            }
        }
    }
    componentDidMount() {
        if (this.state.value) {
            this.fetchArtists()
        }
    }
    async fetchArtists() {
        let response = await fetch(`https://itunes.apple.com/search?term=${this.state.value}&media=music&entity=musicArtist`)
        if (response.status === 200) {
            let data = await response.json()
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
                                this.props.history.push(`/search?artist=${encodeURIComponent(this.state.value)}`)
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
                            history={this.props.history} />
                    })}
                    {this.state.artists.length === 0 && <p>There are no artists</p>}
                </div>
            </div>
        )
    }
})

export default SearchPage