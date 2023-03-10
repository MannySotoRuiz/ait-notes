1. multi-paradigm
    * imperetive / procedural
    * oop (prototypes)
    * functional programming 
2. type system:
    * dynammically typed - dont have to declare type

```
5 + "hello // "5hello"

1/0 // infinity

5 / "hello" // NaN

function f(a,b) {} // undefined

f(1) // undefined

f() // undefined

f(1, 2, 3) // undefined
```
* String
* Number <---- flaoting and integers
* bool
* Objects <--- fxns, Arrays
* null
* Symbol

```
typeof NaN // number

NaN == NaN // false

isNaN(NaN) // true

true || false // true

5 || 0 // 5

"" | "hello" // 0

"" || "hello" // hello

5 * "hello" // NaN

{} + "" // "[object Object]", typeof null // "object", typeof undefined // undefined

parseInt.x = 100, parseInt.x // 100

let x;
let y = x || "some default value" // some default value

x = 0
y = x || "some default value" // some default value
y = x ?? "some default value // 0

let foo = {f: function() {return "foo"}}
foo.f() // "foo"
foo.f().length // 3

foo = {f: function() {return null}}
foo.f().length // Uncaught TypeError: Cannot read properties of nuull

foo.f()?.length // undefined // optional chaining
```

```
function f() {
    x = 100 // global
}
f()
console.log(x) // 100
```
```
for (var i=0; i < 10; i++) {
    var x = 100 // no block level scoping using var
}
console.log(x) // 100
console.log(x) // 10

===

// var y
console.log(y) // undefined
var y = 99
// y = 99
```

```
// blocked level scoping
{
    const x = 100
}
console.log(x) // undefined
```


```
function f(a, b, c) {
    return a + b + c
}

const myFunc = function f(a, b, c) {
    return a + b + c
}
console.log(myFunc(1,2,3)); // 6

const nums = [1,2,3]
nums.forEach(function(n) { // anonymous function
})

``
