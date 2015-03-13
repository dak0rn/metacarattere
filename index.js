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
        root.metacarattere = factory();
    }
} (this, function () {

    // References to native functions
    // This is used to make the script runnable
    // in environments that changed default functions
    var _substr  = String.prototype.substr;
    var _replace = String.prototype.replace;
    var _split   = String.prototype.split;
    var _shift   = Array.prototype.shift;
    var _charAt  = String.prototype.charAt;
    var _push    = Array.prototype.push;

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

    var first = function(str) {
        return _charAt.call(str, 0);
    };

    var charAt = function(str, pos) {
        return _charAt.call(str,pos);
    };

    var push = function(array, value) {
        return _push.call(array,value);
    };

    // Symbols
    var symbols = {
        slash: '/',
        colon: ':',

        multiSlashReplace: /[\/]{2,}/g
    };

    // Helper functions

    // Returns true if the given string is a placeholder
    var isPlaceholder = function(what) {
        return symbols.colon === first(what) && what.length > 1;
    };

    // Returns the name of a placeholder
    var getPlaceholder = function(what) { return substr(what,1); };

    // Normalizes a given URL be removing
    // leading or trailing slashes and multiple slashes
    var normalize = function(what) {
        if( 'string' !== typeof what )
            return undefined;

        // Remove trailing and leading slashes
        var st = 0;
        var en = what.length;

        // Skip leading
        if( symbols.slash === charAt(what, 0) )
            st++;

        if( symbols.slash === charAt(what,en-1) )
            en--;

        what = substr(what,st,en);

        // Replace multiple slashes
        what = replace(what, symbols.multiSlashReplace, '/');

        return what;
    };

    // Main function
    var metacarattere = function(pattern, url) {

        // Normalize the pattern
        pattern = normalize(pattern);

        if( 'undefined' === typeof pattern )
            return;

        // List of patterns
        var ptrns = split( pattern, symbols.slash );

        // This is the real matcher
        var matcher = function(url) {
            var rqst = normalize(url);

            if( 'undefined' === typeof rqst )
                return undefined;

            rqst = split( rqst, symbols.slash );

            // Different number of patterns?
            // -> Return undefined
            if( ptrns.length !== rqst.length )
                return;

            var values = {};
            var pValue,
                kValue;
            var i = 0;


            // Process all parts
            while( i < ptrns.length ) {
                pValue = ptrns[i++];
                kValue = rqst.shift();

                //console.log(pValue, kValue);

                // Something went wrong? Done.
                if( 'undefined' === typeof pValue || 'undefined' === typeof kValue )
                    return;

                // Same pattern? Skip
                if( pValue === kValue )
                    continue;

                // Not a placeholder?
                // Just empty?
                // Pattern does not match
                if( ! isPlaceholder(pValue) || "" === kValue )
                    return;

                pValue = getPlaceholder(pValue);

                values[pValue] = kValue;
            }

            return values;
        };

        // Curried or not?
        if( 'undefined' === typeof url )
            return matcher;
        else
            return matcher(url);
    };

    return function(pattern, url){
        return metacarattere.apply(this,arguments);
    };

}));
