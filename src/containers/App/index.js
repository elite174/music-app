import React from 'react'
import GridView from '../GridView';
import InfoView from '../InfoView';
import SearchView from '../SearchView';
import TableView from '../TableView';
import Menu from '../../components/Menu';

export default class App extends React.Component {
    /**
     * page: grid, info, table, search
     */
    state = { page: 'grid' }
    render() {
        let content
        switch (this.state.page) {
            case 'grid':
                content = <GridView />
                break
            case 'info':
                content = <InfoView />
                break
            case 'table':
                content = <TableView />
                break
            case 'search':
                content = <SearchView />
                break
            default:
                content = <GridView />
        }
        return (<React.Fragment>
            <Menu />
            {content}
        </React.Fragment>)
    }
}