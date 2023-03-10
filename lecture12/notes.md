# Midterm Review

## Promises

look at promises.js

## HTTP and Response

<br>

### Requests

---

METHOD /path HTTP/version
header: value

body

<br>

GET /cats.png HTTP/1.1

Host: localhost

User-Agent: Mozilla/5.0

Cookie: foo=bar;baz=qux

<br>

GET /search?tag=foo HTTP/1.1  (if using form, input data is in query string rather than body for GET requests)

<br>



POST /cats/create HTTP/1.1

Content-Type: application/x-www-urlencoded .... application/json

<br>

foo=bar&baz=qux

```<input type="text" name="foo">  <!-- value typed in is bar -->```


<br>


### Response

---

HTTP/version STATUS_CODE DESC
header: value

body

<br>

HTTP/1.1 200 OK

Content-Type: text/css

Content-Length: ...

Cache-Control: ...

Set-Cookie: foo=bar;HttpOnly;secure

p {
    color: red;
}

<br>

HTTP/1.1 208 Redirect
Location: /foo
Content-Type: text/plain

this a redirect page follow if u like

<br>

1. (user) click on link
2. (user) click on submit bttn for form
4. (server response) follow redirect
4. (user) enter in url bar
5. (server response) client side js
6. (server response) ```<img src=...><link href=...>```

===== different from express

req object

* req.query
* req.path
* req.method
* req.get() - retrieve header

res object
* res.set() - set header
* res.append() - set header w/ same name
* res.render
* res.send
* res.json

---

* express api allows access to request and response data
* actual format is not the same