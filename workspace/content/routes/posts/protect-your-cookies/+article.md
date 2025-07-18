---
date: "2020-10-14T17:38:25+07:00"
title: Protect Your Cookies
description: Learn why you should care about your cookies and how you can protect by securing it
tags: [tech, cookies, http]
thumbnail: https://cdn.pixabay.com/photo/2016/11/17/22/53/biscuit-1832917_960_720.jpg
---

Most modern web application would certainly use cookies to send and receive data between client and server. But, it's not always the safest solution if it isn't implemented correctly. Read on to learn more on why you need to protect your cookies and how you can do it.

If you haven't read my [previous post about JWT](/posts/what-is-jwt-and-do-you-really-need-it), I highly recommend you to check it out, it's an in-depth analysis on not only JWT, but also sessions, tokens, cookies, and storages. Basically, cookies is a storage you can use to store data and communicate between client and server, it's a separate discussion between sessions and tokens. Yes, you can store tokens in local storage as well, but there are other implications. Again, we're here to discuss why and how for cookies, if you'd like to learn more go check out [What is JWT and Do You Really Need It?](/posts/what-is-jwt-and-do-you-really-need-it)

## Why you need to protect your cookies

Those websites you log into on a daily basis knows who you are with HTTP cookies that is stored locally on every device you have it logged in with. That is why you don't need to re-enter your credentials every time you visit it, these cookies are basically your keys or passwords stored in the browser, it could also act on your behalf to communicate to the server and retrieve everything about you, including your whole identity on the server. It would be a catastrophic disaster if you're an admin and some users were to log in as you and tinker around with full unfettered administrative privilege. [More about this story](https://blog.codinghorror.com/protecting-your-cookies-httponly/)

Cross-site scripting (XSS) is one the most dangerous vulnerabilities an application could have, and that's what could happen if you don't take your application security seriously. Stolen cookies are one of the most common thing that would happen when an XSS attack is executed, but it doesn't mean that it's the only thing that would get stolen. You should make sure your whole app is safe and secure to all known vulnerabilities and not just XSS. In a case where no one caught it and it happens, well.. it happens, and there's nothing you can do about it but to stop and fix it as soon as possible. But, you can take the necessary precautions and prepare if and when it happens.

## How you can protect your cookies

> If cookies are so precious, you might find yourself asking why browsers don't do a better job of protecting their cookies

Browsers do provide a way to protect cookies from the most malicious JavaScript, but it's still up to us to utilize those tools as the developers, it's called HttpOnly cookies. This flag tells the browser that this particular cookie should only be accessible by the server, it means no JavaScript executed from the client-side would be able to access this. Of course, this only works with the assumption that it's a modern browser that implements HttpOnly correctly.

```javascript
#$ file: Sapper-flavoured Express
export async function post(req, res) {
  ...
  res.cookie('token', 'my-token-string', { httpOnly: true }); // Set-Cookie with httpOnly
  res.status(200).json({ success: true, message: 'Login successful' });
}
```

In the end, cookies are suggestions the website tells to your browser, the browser will still be the one to decide whether to accept a cookie or not, and they will also decide if they'd want to provide the cookie to JavaScript or not.

To put it simply, when you make an HttpOnly cookie, you are only telling the browser "Please, don't show that to JavaScript". Thus, trust HttpOnly cookies blindly. Most importantly, don't use to store sensitive data like credentials or passwords, only store tokens for this.

So keep in mind that this doesn't make it immune to XSS attacks, but it does alleviate it significantly. The best part of it is that it's practically free, a "set and forget" setting bound to become increasingly secure over time following the evolution of browsers.

> If you develop web applications, or you know anyone who develops web applications, make sure they know about HttpOnly cookies

***
Reference(s):

- <https://blog.codinghorror.com/protecting-your-cookies-httponly/>
- <https://www.ictshore.com/ict-basics/httponly-cookie/>
- <https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies>
