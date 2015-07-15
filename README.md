# Stateless.js

Simple, cross-browser ``pushState`` via changing the hash
fragment. Mainly meant for ~~freeloading~~ serverless web
applications or applications which need to store some state
in the URL, and provides some nice conveniences like:

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
