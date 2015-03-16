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

### The exposed function
`metacarattere` is a constructor function that takes a pattern.

```javascript
var metacarattere = function(pattern) { /*...*/ }
```

If no pattern is given, the created object will not match
any URL so that `matches()` will always return `false` and `parse()` will
always return `null`.
However, it won't throw any exception.

### Match an URL

The `matches()` function can be used to test if the given URL matches
the object's pattern.

```javascript
var metacarattere = require('metacarattere');

var pattern = new metacarattere("/api/:version/:collection/:store/:resource");

pattern.matches('/api/v1/users/max/card');          // true
pattern.matches('/api/v2/store/users/max/card');    // false
pattern.matches();                                  // false
pattern.matches('');                                // false
```

### Parse an URL

The `parse()` function takes an URL and returns an object with key-value-mappings
if the URL matches the pattern. Otherwise, `null` is returned.

```javascript
var metacarattere = require('metacarattere');

var pattern = new metacarattere("/api/:version/:collection/:store/:resource");
var pretty = function(obj) { return JSON.stringify(obj, null, 4); };
var values;

values = pattern.parse('/api/v1/users/max/card');
console.log( pretty(values) );
/*
{
    "version": "v1",
    "collection": "users",
    "store": "max",
    "resource": "card"
}
*/

values = pattern.parse('/api/v1/users/max');
console.log( values );
/*
null
*/

values = pattern.parse('/api/v7.9/cloud/files/database');
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
