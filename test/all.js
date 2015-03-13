var expect = require('chai').expect;
var metacarattere = require('../index.js');

describe('Export', function() {

    it('should export a function', function(){
        expect(metacarattere).to.be.a('function');
    });

});

describe('Exported function', function() {

    it('should return undefined when no arguments are given', function() {
        expect( metacarattere() ).to.be('undefined');
    });

    it('should return a curried function when one argument is given', function() {
        expect( metacarattere('pattern') ).to.be.a('function');
    });

    it('should not return a function when more than one argument is given', function() {
        expect( metacarattere('pattern','url') ).to.not.be.a('function');
    });
    
});
