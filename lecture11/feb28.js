import mongoose from "mongoose";

// all other operations (like save)
// queued...
// once connect to db, operations will executed
// db called class11
mongoose.connect("mongodb://localhost/class11");

// define a schema
// what fields and types of fields do we have 
const CatSchema = new mongoose.Schema({
    name: String,
    lives: Number
})


// register schema as a model
// allows us to use as a constructor / class
// will eventually create a collection with name lowercase and plural of name of mode
// Cat ==> cats
// register model (and get constructor back)
const Cat = mongoose.model("Cat", CatSchema);

const cats = await Cat.find({});
console.log(cats);

// retrieve model
// const Cat = mongoose.model("Cat")

// const c = new Cat({
//     name: "paw newman",
//     lives: 9
// })

const c = new Cat({
    name: 'bill furry',
    lives: 3
});

// await ... wait for promise to resolve
// expression will evaluate to value that promise is fullfilled
try {
    const savedCat = await c.save()
    console.log(savedCat);
} catch (err) {
    console.log(err);
}

/*
c.save().then((savedCat) => {
    console.log(savedCat);
}, errorHandling)
*/

// dealing with async io
// if we want something to happen after
// put it in callback function

// an alternative is to use promises
// a promise is an obj that represents an async task

// * pending
// * finished successfully
// * failed

// call mathods on instance of promise to set what to do on success and failure


// * then will allow you to set success/fullfill and the failure function
// * typically you'll see promises as results of functions/medthods that are async 
//     * reading / writing to db
//     * c.save() --> returns a promise

// then (fullfill)

// fullfill(value) --> value is value that async task succeeded

// * e.g. file reading, value is fullfilled