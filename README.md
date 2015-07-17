# Stateless.js

<img src="https://raw.githubusercontent.com/eugene-eeo/stateless.js/master/media/small.png" hspace="10" vspace="6" align="left"/>

Lightweight cross-browser context persistence library à la
``pushState``, via changing the hash fragment. Mainly meant
for ~~freeloading~~ serverless web applications which need
to store some state in the URL. Also comes with a super
simple API.

 - **Prevents repeated processing -** if the same hash is
 pushed twice *consecutively* it will not be processed twice.
 This is useful for example when you have some expensive
 calculations.
 - **Ability to mark hashes as processed -** they will still
 be pushed to the browser's history stack but they will not
 be processed by any Stateless handlers.
 - **Asynchronous handlers** via hooking into `hashchange`.

The recommended pattern is:

```js
var handler = function(fragment) {
  div.innerText = fragment;
}
Stateless.onChange(handler);

// Pull the current state from the URL
Stateless.pull();

// Skip the already processed state
Stateless.skip(processed);
Stateless.push(processed);

// Stop!
Stateless.off(handler);
```
