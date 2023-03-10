hof
1. has func has arg
2. returns func
3. both ^^^^

built-in
====
myArr.filter(...)

Array.prototype.filter

1. fitler --> return a value
2. map --> return a value
3. reduce ---> 
.reduce((acc, curr) => { return new value of acc}, someInitValue)
```
acc = someInitValue
for (....)
    acc = newValue
acc
```


call --> sets this + invokes function

apply ---> sets this + invokes function

(spread function)

instead of aplpy myFunc(...args) // to call w/ an array of args
(does not set this tho)

parseInt()

const boundParseInt = parseInt.bind(null, 100)

boundParseInt(x) => parseInt(100, x)


```
function f() {
    console.log(this.name)

}
f() // reference err, this is undefined, can't use property on undefined

const boudnF = f.bin({name: "foo})
boundF() // log out foo
```

always use const or let
- they provide blocked level scoping

ex:
```
for (...) {
    let x = 100
}
console.log(x) // err 
// block level scoping!!!!
```

const vs let:
* cant reassign with const

const obj = {}

obj = "asfgff" ERROR

obj.foo = 100 OKAY