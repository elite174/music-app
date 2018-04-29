import React from 'react'
import { inject, observer } from 'mobx-react'
import './style.css'

const ArtistTable = inject('store')(observer(class ArtistTable extends React.Component {
    state = {
        value: ''
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }
    componentDidMount() {
        setTimeout(() => this.props.store.addArtist('Another artist'), 5000)
    }
    render() {
        return <div>
            <input type='text' value={this.state.value} onChange={this.handleChange} />
            <table className='artist-table'>
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Rating</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.store.getArtistsByName(this.state.value).map(artist => {
                        return <tr key={artist.id}>
                            <td>{artist.name}</td>
                            <td>{artist.getRating()}</td>
                            <td>{artist.description}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    }
}))

export default ArtistTable