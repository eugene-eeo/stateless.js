<a name="Stateless"></a>
## Stateless : <code>object</code>
**Kind**: global namespace  

* [Stateless](#Stateless) : <code>object</code>
  * [.onChange(handler)](#Stateless.onChange)
  * [.off(handler)](#Stateless.off)
  * [.clear()](#Stateless.clear)
  * [.skip(state)](#Stateless.skip)
  * [.pull()](#Stateless.pull)
  * [.push(state)](#Stateless.push)
  * [.replace(state)](#Stateless.replace)

<a name="Stateless.onChange"></a>
### Stateless.onChange(handler)
Register a Stateless handler. Handlers will
be passed the hash fragment after the hash
character.

**Kind**: static method of <code>[Stateless](#Stateless)</code>  

| Param | Type |
| --- | --- |
| handler | <code>function</code> | 

<a name="Stateless.off"></a>
### Stateless.off(handler)
Removes the given handler from the registered
handlers.

**Kind**: static method of <code>[Stateless](#Stateless)</code>  

| Param | Type |
| --- | --- |
| handler | <code>function</code> | 

<a name="Stateless.clear"></a>
### Stateless.clear()
Clears the array of registered handlers.

**Kind**: static method of <code>[Stateless](#Stateless)</code>  
<a name="Stateless.skip"></a>
### Stateless.skip(state)
Mark the state as processed- if the hash is
changed to the identical state then no Stateless
handlers will be fired. You do not need to prefix
the state with a hashtag.

**Kind**: static method of <code>[Stateless](#Stateless)</code>  

| Param | Type |
| --- | --- |
| state | <code>String</code> | 

<a name="Stateless.pull"></a>
### Stateless.pull()
Pull the current state from the URL, and
forcefully runs the handlers regardless
of whether the hash has changed.

**Kind**: static method of <code>[Stateless](#Stateless)</code>  
<a name="Stateless.push"></a>
### Stateless.push(state)
Set the current hash fragment as the given
state. Note that it is not necessary to
preceed your strings with '#'.

**Kind**: static method of <code>[Stateless](#Stateless)</code>  

| Param | Type |
| --- | --- |
| state | <code>String</code> | 

<a name="Stateless.replace"></a>
### Stateless.replace(state)
Replaces the current hash with the given state.
Does not push another entry into the browser
history.

**Kind**: static method of <code>[Stateless](#Stateless)</code>  

| Param | Type |
| --- | --- |
| state | <code>String</code> | 

