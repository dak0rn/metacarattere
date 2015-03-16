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

    // API functions
    // These functions are exposed using delegator functions in the
    // prototype
    var api = {
        parse: function(url) {
            // We want to have a string
            if( 'string' !== typeof url )
                return null;

            var values = match(url, this._compiledExpression);
            var i;
            var result = {};
            var len = this._placeholders.length;

            if( null === values )
                return null;

            // Skip the first value, it contains the whole URL
            shift(values);

            // Return null, if they did not match the same
            // number of fields
            // Should not happen since match() should return `null` in that
            // case but we really want to be sure
            if( values.length !== len )
                return null;

            // Map placeholder names to the values
            for( i = 0; i < len; i++ )
                result[ this._placeholders[i] ] = values[i];

            return result;
        },

        matches: function(url) {
            return 'string' === typeof url &&
                null !== match(url, this._compiledExpression);
        }
    };

    var metacarattere = function(pattern) {

        // Default values
        this._compiledExpression = '(?!)';      // Never matching default
        this._placeholders = [];

        var tmp;

        if( 'string' === typeof pattern ) {
            // Create an array of placeholder IDs
            tmp = match(pattern, symbols.placeholder);

            // Parse placeholders
            if( null !== tmp )
                this._placeholders = map( tmp, getPlaceholder );

            // Create a regular expression from the pattern
            this._compiledExpression = replace(pattern, symbols.placeholder, symbols.regexPlaceholder);
        }

        // Make sure we match full patterns only
        // If no pattern was given, this creates the expression
        // $(?!)^ that never matches
        this._compiledExpression = new RegExp("^" + this._compiledExpression + "$");

    };

    // Instance functions ('methods')
    metacarattere.prototype = {
        matches: function(url) {
            return api.matches.apply(this,arguments);
        },

        parse: function(url) {
            return api.parse.apply(this,arguments);
        }
    };

    return metacarattere;

}));
