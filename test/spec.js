var expect = require('chai').expect;
//var metacarattere = require('../index.js');

module.exports = function(metacarattere) {

    describe('Export', function() {

        it('should export a function', function(){
            expect(metacarattere).to.be.a('function');
        });

    });

    describe('Exported function', function() {

        it('should return undefined when no arguments are given', function() {
            expect( metacarattere() ).to.be.undefined;
        });

        it('should return a curried function when one argument is given', function() {
            expect( metacarattere('pattern') ).to.be.a('function');
        });

        it('should not return a function when more than one argument is given', function() {
            expect( metacarattere('pattern','url') ).to.not.be.a('function');
        });

    });

    describe('Pattern matcher', function() {

        it('should accept patterns w/out placeholders', function(){
            metacarattere("/no/pattern","/no/pattern");
            // Should not throw any exception
        });

        it('should return undefined or null if the URLs do not have the same number of fields', function() {
            var pattern = "/a/b/c";

            ['/a','a/b/c/d/e'].forEach( function(url) {
                expect( metacarattere(pattern, url) ).not.to.exist;
            });
        });

        it('should return undefined for invalid strings', function() {
            expect( metacarattere(42) ).not.to.exist;
            expect( metacarattere('/:id',4) ).not.to.exist;
            expect( metacarattere('/:id')({a:99}) ).not.to.exist;
        });

        it('should match correctly', function() {
            var pattern = "/employees/:id/status/:state";
            var url     = "/employees/4/status/fired";
            var result  = { "id": "4", "state": "fired" };

            expect( metacarattere(pattern, url) ).to.deep.equal(result);
        });

        it('should match using the returned function', function() {
            var pattern = "/employees/:id/status/:state";
            var url     = "/employees/4/status/fired";
            var result  = { "id": "4", "state": "fired" };

            expect( metacarattere(pattern)(url) ).to.deep.equal(result);
        });

        it('should not match partly', function(){
            var pattern = metacarattere("/vendor/:name/product/:prod");

            expect( pattern('/vendor/apple') ).not.to.exist;
            expect( pattern('/vendor/apple/product/macbookair') ).to.be.an('object');
            expect( pattern('/vendor/apple/product/macbookair') ).to.deep.equal( { "name": "apple", "prod": "macbookair" } );
            expect( pattern('/vendor/microsoft/product/codeplex/accounts/locked') ).not.to.exist;
        });
    });

};
