# Stateless.js

Simpler ``pushState`` via changing the hash fragment. Mainly
meant for ~~freeloading~~ serverless web applications or web
applications which need to store some state in the URL, and
provides some nice conveniences like:

 - Preventing identical updates to the hash (and repeated
   processing required) so that the browser history will
   not be overly long.
 - Allowing changes to be marked as "processed" so that
   for example expensive handlers will not be fired.

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
