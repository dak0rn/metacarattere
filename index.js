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
    var _charAt  = String.prototype.charAt;

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

    // Symbols
    var symbols = {
        slash: '/',
        colon: ':',

        multiSlashReplace: /[\/]{2,}/g
    };

    // Helper functions

    // Returns true if the given string is a placeholder
    var isPlaceholder = function(what) { return symbols.colon === first(what); };

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

    };

    return function(pattern, url){
        return metacarattere.apply(this,arguments);
    };

}));
