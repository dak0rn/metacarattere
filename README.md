# metacarattere
metacarattere is a small matcher for URLs with colon placeholders.

## Installation

You can install metacarattere for your node.js (or CommonJS in general) project
with `npm`:

```shell
npm install metacarattere
```

You also can install it with `bower` for your front-end (or AMD in general) project:

```shell
bower install metacarattere
```

## Usage


### Loading it
Depending on your project structure, metacarattere is exposed in different ways.

* If you are in a browser environment without any module loader a global `metacarattere`
function will be exposed (as `window.metacarattere`).
* If you use a module loader such as require.js in your front-end application, you
can load metacarattere like any other module.
* If you are in a node.js environment, metacarattere can be required as usual.

### The curried function
`metacarattere` is a function that expects either one or two arguments:

```javascript
var metacarattere = function(pattern, url) { /*...*/ }
```

If only `pattern` is given, `metacarattere` returns a function that takes
the URL and does all the magic with it. This pattern is called as *currying*.

### Matching URLs agains patterns

Here is a short usage example:

```javascript
var metacarattere = require('metacarattere');

var pattern = "/api/:version/:collection/:store/:resource";
var values;
var matcher = metacarattere(pattern);       // Currying!
var pretty = function(obj) { return JSON.stringify(obj, null, 4); };

values = matcher('/api/v1/users/max/card');
console.log( pretty(values) );
/*
{
    "version": "v1",
    "collection": "users",
    "store": "max",
    "resource": "card"
}
*/

values = matcher('/api/v1/users/max');
console.log( values );
/*
undefined
*/

values = matcher('/api/v7.9/cloud/files/database');
console.log( pretty(values) );
/*
{
    "version": "v7.9",
    "collection": "cloud",
    "store": "files",
    "resource": "database"
}
*/
```

## Naming

metacarattere is the Italian word for *Wild card*.
