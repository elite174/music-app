import React from 'react'
import SearchPage from '../../components/SearchPage';
import ArtistPage from '../../components/ArtistPage';

export default class App extends React.Component {
    /**
     * page: grid, info, table, search
     */
    state = {
        page: 'search',
        artistId: null,
        name: null,
        genre: null
    }
    changePage = (page, name, genre, id) => {
        this.setState({
            page: page,
            artistId: id,
            name, genre
        })
    }
    render() {
        let content
        if (this.state.page === 'search') {
            content = <SearchPage changePage={this.changePage} />
        } else if (this.state.page === 'artist') {
            content = <ArtistPage artistId={this.state.artistId} name={this.state.name} genre={this.state.genre} />
        }
        return <React.Fragment>
            {content}
        </React.Fragment>
    }
}