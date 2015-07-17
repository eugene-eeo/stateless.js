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

### In a Nutshell

Manipulating the browser hash:

```js
Stateless.push('1')    // #1, new history entry
Stateless.replace('2') // #2, modifies entry
```

Skipping a hash:

```js
Stateless.skip('1'); // '1' pushed into set
Stateless.push('1'); // Handlers not fired, '1' removed
```

Manipulating the handlers:

```js
Stateless.onChange(f1); // => [f1]
Stateless.onChange(f2); // => [f1, f2]
Stateless.off(f1);      // => [f2]
Stateless.clear();      // => []
```
