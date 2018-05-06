import { types, flow, getParent, getRoot, getSnapshot, destroy } from 'mobx-state-tree'


const Album = types.model('Album', {
    id: types.optional(types.identifier(types.number), () => { return Math.random() }),
    name: types.string,
    cover: types.string,
    year: types.number
})

const Artist = types.model('Artist', {
    id: types.optional(types.identifier(types.number), () => { return Math.random() }),
    name: types.string,
    description: types.optional(types.string, ''),
    albums: types.optional(types.array(Album), []),
    genre: types.optional(types.string, '')
}).actions(self => {
    let rati = 0
    return {
        afterAttach() {
            self.setRating(5)
        },
        setRating(rating) {
            rati = rating
        },
        getRating() {
            return rati
        }
    }
})



const StoreModel = types.model('StoreModel', {
    artists: types.array(Artist)
}).views(self => {
    return {
        getArtistsByRating(rating) {
            return self.artists.filter(artist => { return artist.rating >= rating })
        },
        getArtistsByName(name) {
            return self.artists.filter(artist => {
                return artist.name.indexOf(name) !== -1
            })
        }
    }
}).actions(self => {
    return {
        afterCreate() {
            self.addArtist('1Sample artist')
            self.addArtist('2Sample artist')
            self.addArtist('3Sample artist')
            self.addArtist('4Sample artist')
            self.addArtist('5Sample artist')
            self.addArtist('6Sample artist')
            self.addArtist('7Sample artist')
            self.addArtist('7Sample artissdt')
        },
        addArtist(name) {
            self.artists.push(Artist.create({
                name: name
            }))
        },
    }
})

const store = StoreModel.create({
    artists: []
})

export default store
