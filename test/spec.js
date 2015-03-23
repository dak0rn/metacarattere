var expect = require('chai').expect;

module.exports = function(metacarattere) {

    describe('Export', function() {

        it('should export a (constructor) function', function(){
            expect(metacarattere).to.be.a('function');
        });

    });

    describe('Exported function', function() {

        it('should return undefined when invoked', function() {
            expect( metacarattere(':pattern') ).to.be.undefined;
        });

        it('should return an object when invoked with new', function() {
            expect( new metacarattere(':pattern') ).to.be.an('object');
        });

        it('should not throw if no argument is given', function() {
            new metacarattere();        // That's all
        });

        it('should accept patterns w/out placeholders', function(){
            var inst = new metacarattere('pattern');
        });

    });

    describe('metacarattere instance', function() {

        describe('matches() function', function() {

            it('should exist', function() {
                var inst = new metacarattere(':pattern');

                expect( inst.matches ).to.be.a('function');
            });

            it('should return false if arguments are given', function() {

                var inst = new metacarattere(':pattern');
                expect( inst.matches() ).to.be.false;
            });

            it('should return false if it does not match', function() {
                var inst = new metacarattere('/a/b/c');

                ['/a','a/b/c/d/e'].forEach( function(url) {
                    expect( inst.matches(url) ).to.be.false;
                });
            });

            it('should return true if it does match', function() {
                var inst = new metacarattere('/a/:b/:c');

                ['/a/3/4','/a/true/false','/a/hello/world'].forEach( function(url) {
                    expect(inst.matches(url)).to.be.true;
                });
            });

            it('should not match partly', function(){
                var inst = new metacarattere("/vendor/:name/product/:prod");

                expect( inst.matches('/vendor/apple') ).to.be.false;
                expect( inst.matches('/vendor/apple/product/macbookair') ).to.be.true;
                expect( inst.matches('/vendor/microsoft/product/codeplex/accounts/locked') ).to.be.false;
            });

            it('should not match when no pattern is given', function() {
                var inst = new metacarattere();

                ['/a/3/4','/api/true/false','/collection/hello/world'].forEach( function(url) {
                    expect(inst.matches(url)).to.be.false;
                });
            });


        });

        describe('parse() function', function() {

            it('should exist', function(){
                var inst = new metacarattere(':pattern');

                expect( inst.parse ).to.be.a('function');
            });

            it('should return null if no arguments are given', function() {

                var inst = new metacarattere(':pattern');
                expect( inst.parse() ).to.be.null;
            });

            it('should return null if it does not match', function() {
                var inst = new metacarattere('/a/b/c');

                ['/a','a/b/c/d/e'].forEach( function(url) {
                    expect( inst.parse(url) ).to.be.null;
                });
            });

            it('should return an object w/ key-value-paris if it does match', function() {
                var inst = new metacarattere('/a/:b/:c');

                expect( inst.parse('/a/3/4') ).to.deep.equal( { b: '3', c: '4' } );
                expect( inst.parse('/a/hello/world') ).to.deep.equal( { b: 'hello', c: 'world' } );
            });

            it('should not match partly', function(){
                var inst = new metacarattere("/vendor/:name/product/:prod");

                expect( inst.parse('/vendor/apple') ).not.to.exist;
                expect( inst.parse('/vendor/apple/product/macbookair') ).to.be.an('object');
                expect( inst.parse('/vendor/apple/product/macbookair') ).to.deep.equal( { "name": "apple", "prod": "macbookair" } );
                expect( inst.parse('/vendor/microsoft/product/codeplex/accounts/locked') ).not.to.exist;
            });

            it('should return false if no pattern was given', function() {
                var inst = new metacarattere();

                ['/a/3/4','/api/true/false','/collection/hello/world'].forEach( function(url) {
                    expect(inst.matches(url)).to.be.false;
                });
            });

        });

        describe('getPattern() function', function() {
            it('should exist', function() {
                var inst = new metacarattere('/:pattern');

                expect( inst.getPattern ).to.be.a('function');
            });

            it('should return the original pattern', function() {
                [ '/prod/:id', '/a/b/c/d/', '/version/key/:abc', undefined, null ].forEach(function(pattern) {
                    var inst = new metacarattere(pattern);
                    expect( inst.getPattern() ).to.equal(pattern);
                });
            });
        });

        describe('getPlaceholders() function', function() {
            it('should exist', function() {
                var inst = new metacarattere('/:pattern');

                expect( inst.getPlaceholders ).to.be.a('function');
            });

            it('should return the placeholders', function() {
                [
                    { pattern: '/prod/:id', placeholders: ['id'] },
                    { pattern: '/a/b/c/d', placeholders: [] },
                    { pattern: '/:version/:key/:abc', placeholders: ['version','key','abc'] },
                    { pattern: '', placeholders: [] },
                    { pattern: undefined, placeholders: [] },
                    { pattern: null, placeholders: [] }

                ].forEach(function(what) {
                    var inst = new metacarattere(what.pattern);
                    expect( inst.getPlaceholders() ).to.eql(what.placeholders);
                });
            });
        });

        describe('getExpression() function', function() {
            it('should exist', function() {
                var inst = new metacarattere('/:pattern');

                expect( inst.getExpression ).to.be.a('function');
            });

            it('should return the compiled regex', function() {

                [
                    { pattern: '/prod/:id', regex: new RegExp('^/prod/([^\/]+)$').toString() },
                    { pattern: '/a/b/c/d', regex: new RegExp('^/a/b/c/d$').toString() },
                    { pattern: '/:version/:key/:abc', regex: new RegExp('^/([^\/]+)/([^\/]+)/([^\/]+)$').toString() },
                    { pattern: '',  regex: new RegExp('^$').toString() },
                    { pattern: undefined,  regex: new RegExp('^(?!)$').toString() },
                    { pattern: null,  regex: new RegExp('^(?!)$').toString() }

                ].forEach(function(what) {
                    var inst = new metacarattere(what.pattern);
                    expect( inst.getExpression().toString() ).to.equal(what.regex);
                });
            });
        });

        describe('build() function', function() {
            it('should exist', function() {
                var m = new metacarattere('/:pattern');
                expect( inst.build ).to.be.a('function');
            });

            it('should build an URL correctly', function() {
                var m = new metacarattere('/:a/:b/:c');
                var values = { a: 'hello', b: 'world', c: 'eof' };
                expect( m.build(values) ).to.equal('/hello/world/eof');
            });

            it('should build partly', function() {
                var m = new metacarattere('/:a/:b/:c');
                var values = { a: 'hello', b: 'world' };
                expect( m.build(values) ).to.equal('/hello/world/:c');
            });

            it('should return null if no substitution values are given', function() {
                expect( new metacarattere('/:a').build() ).to.be.null;
                expect( new metacarattere('/:a').build(null) ).to.be.null;
            });

            it('should return null if an invalid pattern was given', function() {

                [undefined, null, 42].forEach( function(pattern) {
                    [{a:'b'}, '', undefined, null].forEach( function(substs) {
                        expect( new metacarattere(pattern).build(substs) ).to.be.null;
                    });
                });

            });

            it('should produces a re-matching pattern', function() {
                var m = new metacarattere('/:a/:b/:c');
                var values = { a: 'hello', b: 'world', c: 'neo' };
                var str = m.build(values);
                expect( str ).to.equal('/hello/world/neo');
                expect( m.matches(str) ).to.be.true;
                expect( m.parse(str) ).to.deep.equal(values);
            });
        });

    });

};
