## State and HTTP

HTTP is a stateless protocol

somtimes it's useful to have this state:

* "client" tracking... has this client returned before (visit count, ui customization)
* keeping authentication persistent ... you have to login once, subsequent requests, no lo in required: auth =/= session management
* persistent data ... shopping cart

data / state
1. client
    * cookies
    * local storage
    * can bo modified / changed by user
2. server
    * user doesnt have direcr access to data
    * but there has tro be some sort of indentifier of "key" or session id that unlocks data for that client

exists on server (in memory store, acutal db, etc.)

{
    1234: {cart: [{price: 2, name: foo}, ...]}
    7890: {cart: [{price: 2, name: foo}, ...]}
}

                                            client
        <---- http req must includes sess id
              ex: 1234
        ----> page that has cart data for 1234


session id

* difficult to guess (not sequential, probs random)
* not easily visible
* collision resistant (don't want the same session id generated)

GET /path HTTP/1.1

headers <----

body

cookies =/= session management
u can use cookies for sesssion management
but cookies have other purposes as well

cookie: small bits of data stored on that client

* the server says what the client should store as cookies
* the client will keep that data, and send to server on every request

server response will include

Set-Cookie: name=value;option1;option2

Set-Cookie: name2=value2;options...

client HTTP request

Cookie: name=value1;name2=value2

### how will cookies last

* default, session cookies
    * when browser closes cookies are removed
* permanent
    * Expires=...
    * Max-Age=300

### domain and path

when to send cookies for domains and paths

* Domain: cookies only sent for this domain + subdomains... more permissive
    * default is no subdomains, just domain that set cookie\
* Path: specific paths (subdirectoires of path are valid for sending cookies)
    * default all paths

### security

* Secure: cookies are only sent when protocal is https
* HttpOnly: cookies cannot be read by client side JS
* SameSite: specifies when cookies are sne twhen request from site is made
    * site has imgs, css, other external resources.... should cookies be sent 
    * when user clicks on link from this site
    * Lax (default): <----- navigation (clicking on a link sends cookies)
    * Strict: only same site (excludes navigation)
    * None: always sends cookies

Use secure, HttpOnly

* common to use other site (cdn) to host resources (e.g. bootstrap)
    * may include JS
    * JS comes from 3rd party ... may be able to read cookies

Keep SameSite as default (lax)



1. client makes http request
2. server checks if cookies are present
    * if cookies are present
        * look up data for that session id...
        * send back response potentially data related to session id
    * if no cookies, no session id or session id is not valid
        * generate a new session id
        * for the http response, set Set-Cookie with new session id



make your own session handling middleware

* access to session data by using 
* req.mySession 
    * req.mySession.someFieldName = req.body.someFieldName
    * res.render("template", {data: req.mySession.data})

1. middleware function that works on all request before route handlers
2. parse cookies (parse out Cookie header name1=value1;name2=value2)
3. search for name of session id and retrieve value
4. search for session id in session store
5. set req.mySession to that data ^^^^
6. if no cookies, no sess id or no valid sess id
7. then generate new session id, and init to empty {}: req.mySession = {}

There's middleware that does this: express session

1. import 
2. set some options
    * what is your session store (default is in-memory)
    * what is your session id generation function
    * signing secret
    * saving unitialized session
    * resave ... 
3. register as middleware

* in memory as global variable
* session store... in meory

more permanent options

on your own server(s)

* direct file manipulation on file system
    * may be race conditions 
    * may need to deal with file locking
* database <------------------------------
    * files on file system
    * mediated through dbms
    * postgres, mysql, couchdb, mongodb 

on someone else's server

* firebase
* salseforce
* dynamodb
* atlast (mongodb cloud solution)

databases

1. relational db
2. non-relational db (nosql) <------- we are using this
* hybrids

relational db

* data is stored in tables
* rows and columns - intersections gives you a value
* rigid
    * define columns, types of those columns, relationships btwn tables
    * upfront desgin work (model ur data) must be done
* repuation for being more difficult to use (learning curve, upfront cost in design)
* transactions 
    * multiple operations treated as one
    * atomic - all or nothing (if part of xact fails, then whole xact is rolled back)
    * consistent - after xact completes, db is in valid state
    * isolated - if one fails, it does not affect other transactions
    * durable - on / off cycles leave db in valid state
    * ACID compliance

joe
versiza
251 mercer st
new york

person
====
first
last
street
city

1 to 1 relationship person and adress

person
====
person_id
first
last
address_id

address
====
address_id
street
city

person
====
person_id
first
last

person_address
====
person_id
address_id

address
====
address_id
street
city


non-relational db - document store - mongodb

1. easy to use... available on multiple platforms, easy to install
2. query language is JS
3. result is js objects
4. well known for express mongodb react
