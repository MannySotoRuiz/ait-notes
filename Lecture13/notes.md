mongodb

* document - like a js obj ... collection of k/v pairs... or json doc
* collection - can hold many documents
* database - can contain many collections
* one instance of mongodb - can hold many databases

mongoose

* objects / instances ---> document
* Model + Schema ---> collection + rules for what a document in this collection will look like:
    * property names
    * the types of those properties
* it does connect to a specific database
    * connection string... connected to a specific database

Movie
====
director first name
director last name
title
year

one document

{
    first: "David",
    last: "Lynch",
    title: "Dune:,
    year: 1980
}


one document with embedded sub-docs

{
    director: { first: "Denis", last: "Villenue" },
    title: "Dune:,
    year: 2021
}

two documents: one document refrences the other by id

{
    title: "Dune",
    year: 2021,
    director: 1
}

{
    _id: 1
    first: "Denis",
    last: "Villenue"
}

{
    _id: 2
    first: "Denis",
    last: "Villenue"
}

{
    title: "Matrix",
    year: 1998,
    director: [3, 1]
}

embedded vs reference

* how do u ened up using these docs
* are they together... or do u wokr with them indepenedtly
* if u usually use a single part of that doc, then embedded sub docs might result in excess data being transferred (e.g. ... you only need movie info, but u always get director) ... separate collections may be more appropriate
* embedded cos --> may end up w/ redundant data: -->  again, maybe separate collections referencing each other makes more sense

    ```

    {
        director: { first: "Denis", last: "Villenue" },
        title: "Dune:,
        year: 2021
    }

    {
        director: { first: "Denis", last: "Villenue" },
        title: "BladeRunner 2048",
        year: 2019
    }
    ```
* anomalies (e.g. delete)

    ```
    {
        director: { first: "Denis", last: "Lynch" },
        title: "Dune:,
        year: 1982
    }
    ```

* if two entitites are often / always used / shown together, then embedded
* when we're working with references, there's likely two queries... if u wan to optmimize for very fast reads... then maybe use embedded
* simple model / easy to comprehend --> embedded