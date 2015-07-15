# Stateless.js

<img src="https://raw.githubusercontent.com/eugene-eeo/stateless.js/master/media/small.png" hspace="10" vspace="6" align="left"/>

Lightweight cross-browser context persistence library à la
``pushState``, via changing the hash fragment. Mainly meant
for ~~freeloading~~ serverless web applications which need
to store some state in the URL.

 - Preventing repeated processing of identical hashes- if you
 push the same hash twice it will not be processed twice. This
 is useful for example when you have some expensive
 calculations.
 - Ability to mark hashes as "processed"- they will still be
 pushed to the browser's history stack but they will not be
 processed by any Stateless handlers.

The recommended pattern is:

```js
Stateless.onChange(function(fragment) {
    div.innerText = fragment;
});

// Pull the current state from the URL
Stateless.pull();

// Skip the already processed state
Stateless.skip(processed);
Stateless.push(processed);
```
