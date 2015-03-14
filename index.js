/**
 * metacarattere
 * An URL pattern matcher utility
 *
 * Copyright (c) 2015 Daniel Koch
 *
 * https://github.com/dak0rn/metacarattere
 *
 * Licensed under The MIT License (MIT).
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
        root.metacarattere = factory();
    }
} (this, function () {

    // References to native functions
    // This is used to make the script runnable
    // in environments that changed default functions
    var _substr  = String.prototype.substr;
    var _replace = String.prototype.replace;
    var _shift   = Array.prototype.shift;
    var _map     = Array.prototype.map;
    var _match   = String.prototype.match;

    var substr = function(str, s, e) {
        return _substr.call(str,s,e);
    };

    var replace = function(str,regex,repl) {
        return _replace.call(str,regex,repl);
    };

    var shift = function(array) {
        return _shift.call(array);
    };

    var map = function(array,fn) {
        return _map.call(array,fn);
    };

    var match = function(string, what) {
        return _match.call(string, what);
    };

    // Symbols
    var symbols = {

        // Used to detect placeholders
        placeholder: /\/:\w+/g,

        // Placeholder inserted into the regex
        regexPlaceholder: "/([^\/]+)"
    };

    // Helper functions

    // Returns the name of a placeholder
    var getPlaceholder = function(what) { return substr(what,2); };

    // Main stuff
    var metacarattere = function( pattern, url ) {

        if( 'string' !== typeof pattern )
            return undefined;

        // Match placeholders
        var placeholders = match(pattern, symbols.placeholder);

        // Extract placeholder names
        if( null !== placeholders )
            placeholders = map(placeholders, getPlaceholder );
        else
            placeholders = [];

        // Create a valid regex out of the pattern
        // /api/:version/users/:id  =>  ^/api/([^\/]+)/users/([^\/]+)$
        var compiledExpression = "^" + replace(pattern, symbols.placeholder, symbols.regexPlaceholder) + "$";

        var matcher = function(url) {

            if( 'string' !== typeof url )
                return null;

            var values = match(url, compiledExpression);
            var i;
            var result = {};
            var len = placeholders.length;

            if( null === values )
                return null;

            // The first match contains the whole expression: skip it
            shift(values);

            if( values.length !== len )
                return null;

            for( i = 0; i < len; i++ ) {
                result[ placeholders[i] ] = values[i];
            }

            return result;
        };

        if( 'undefined' === typeof url )
            return matcher;
        else
            return matcher(url);

    };

    return function(pattern, url){
        return metacarattere.apply(this,arguments);
    };

}));
