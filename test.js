function f() {
    let value = 0
    let f = () => { }

    return {
        setValue(v) {
            value = v
            f()
        },
        getValue() {
            return value
        }
    }
}

let a = f()
a.value
console.log(a.getValue())
a.setValue(2)
console.log(a.getValue())