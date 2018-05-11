import React from 'react'
import SearchPage from '../../components/SearchPage';
import ArtistPage from '../../components/ArtistPage';
import { Route, Redirect } from 'react-router'
export default class App extends React.Component {
    render() {
        return <div>
            <Route exact path='/' render={() => <Redirect to='/search' />} />
            <Route path='/search' component={SearchPage} />
            <Route path='/albums' component={ArtistPage} />
        </div>
    }
}