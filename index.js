/**
 * metacarattere URL pattern matcher
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    }
    else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    }
    else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
} (this, function () {

    // References to native functions
    // This is used to make the script runnable
    // in environments that changed default functions
    var _substr = String.prototype.substr;
    var _replace = String.prototype.replace;
    var _split   = String.prototype.split;
    var _shift   = Array.prototype.shift;

    var substr = function(str, s, e) {
        return _substr.call(str,s,e);
    };

    var replace = function(str,regex,repl) {
        return _replace.call(str,regex,repl);
    };

    var split = function(str, token) {
        return _split.call(str,token);
    };

    var shift = function(array) {
        return _shift.call(array);
    };

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return function(){};
}));
