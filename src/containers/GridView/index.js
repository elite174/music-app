import React from 'react'
import { inject } from 'mobx-react'
import ArtistTable from '../../components/ArtistTable';


const GridView = inject('store')(class GridView extends React.Component {
    render() {
        return <div>
            <ArtistTable />
        </div>
    }
})

export default GridView