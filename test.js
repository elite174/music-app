import { types, flow } from 'mobx-state-tree'

const A = types.model({
    a: types.number
}).actions(self => {
    return {
        setA: flow(function* (number) {
            yield new Promise((resolve, reject) => {
                setTimeout(() => {
                    self.a = 5
                    resolve()
                }, 5000)
            })
        })
    }
})

const B = types.model({
    b: types.array(A)
}).actions(self => {
    return {
        setB() {
            self.b = [A.create({ a: 1 })]
        }
    }
})

let b = B.create({ b: [A.create({ a: 1 })] })
b.b[0].setA()
b.setB()