---
date: "2020-07-30T17:38:25+07:00"
title: CORS Crash Course - Client or Server?
description: A brief yet sufficient explanation for Cross-Origin Resource Sharing (CORS)
tags: [tutorial, javascript, cors]
---

> Answer is **Server**. Read the rest for the explanation.

```
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://yourapidomain. (Reason: CORS header 'Access-Control-Allow-Origin' missing).
```

If you're stumbling to this post, chances are you've encountered the notorious `CORS header 'Access-Control-Allow-Origin' missing` when fetching resources across the network.

## What is CORS

In simple terms, **Cross-Origin Resource Sharing** (CORS) is safe-gate that lives in request headers to tell browsers to give a web application running at one origin access to resources from the server giving these headers. It looks something like this

```
Access-Control-Allow-Origin: *
```

The wildcard `*` is saying that any client coming from any origin (domain) can access, request, and receive responses from this server (API / backend). This is mainly used in development environment, a typical production setup would have it disabled by setting it like so

```
Access-Control-Allow-Origin: https://mauss.dev
```

Cool, so there's basically only 2 option for the server to provide. A wildcard `*` for development setup or public APIs, and specified origin for production setup. Again, everything set up in the server-side.

## Client-side Fetch

The first section pretty much covers what you'll need to do for handling CORS from the server. Everything after this is technical JS stuff, feel free to stick around for more info on how to further secure your web app.

```javascript
// Example POST method implementation:
async function postData(url = '', data = {}) {
// Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
```

Above is a code snippet from MDN docs that shows us fetch default mode and credentials. We see that it doesn't bring any credentials (cookies) by default and outgoing requests will be anonymous / auth-less. [Why?](https://javascript.info/fetch-crossorigin#credentials) because a request with credentials is much more powerful than without them. If allowed, it grants JavaScript the full power to act on behalf of the user and access sensitive information using their credentials.

Just imagining it is quite scary, having a client-side code that can be executed by anyone the full power to act on behalf of you. What happens when an admin credentials is stolen. Does the server really trust the script that much? If so, it must be explicitly passed in the options as `credentials: 'include'`.

If the server agrees to accept the request with *credentials*, it must pass an additional headers from the server to the browser in addition with `Access-Control-Allow-Origin`

```
Access-Control-Allow-Origin: https://mauss.dev
Access-Control-Allow-Credentials: true
```

Here, we encounter another problem. By allowing credentials to be passed with the request, CORS wildcard `*` cannot be used and so you can't test this locally. Keep in mind, all this hassle is for the safety of our application, having the server set an origin for `Access-Control-Allow-Origin` is probably enough, but it makes our (us working in the front-end) job a nightmare. We'll talk more about securing request after this.

We have a couple ways to get around this, one of them is to have 2 separate setup for local and production (duh). Another one is to explicitly set the `Authorization` header and pass the token there on every fetch requests. So, it'll look something like this

```javascript
const data = { message: 'hello' };
const token = localStorage.token; // or from cookies

fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `Token ${token}`, // pass it here
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

You'll typically have a wrapper that'll make it reusable and convenient to use rather than specifying it for each fetch request.

## Securing requests

If you have the luxury of having the server available in the same domain as the client, rejoice and be delightful for it is probably the most secure and convenient way to have it set up. You can disable CORS completely and have a peace of mind. It means having the app served in `awesome.com` and your server in `awesome.com/api`. Of course, there's some caveat to having everything in one place, like a potential DDoS that will shut everything down completely if it were to happen. But, that's another story for another time.

If you have it served as a subdomain or at another place would have to resort to conventional methods. In addition to setting an origin to `Access-Control-Allow-Origin`, you could also have your server manage session and credentials by serving cookies as `HttpOnly` from the server. This is another deep dive that will be covered in another post, you can research it and study for yourself if you're eager to know more. I'll update this section when I've posted about it.

The important thing is that your server explicitly sets an specific origin to allow requests and credentials to be sent from. So as long as it's not a wildcard `*`, you're already one step further towards securing your application.

## Final statement

Congratulations for reaching the end of this "brief" crash course and thank you for reading this. If you're still confused or have any other questions, feel free to send me a message in Twitter or LinkedIn, links down below. Make sure to get and subscribe to the RSS feed at the navigation bar for more stuff like this or just random things I find interesting.

I made this post specifically because I know there are some of you that's still confused who is blocking the request, what is that missing header, and where do I put that header, how do I "fetch", and so on. I'm also talking from experience so I knew those are true 😅

---
Reference(s):

- <https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin>
- <https://stackoverflow.com/questions/60270574/how-to-set-cors-headers-to-a-client>
- <https://javascript.info/fetch-crossorigin#credentials>
- <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch>
