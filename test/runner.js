'use strict';

let run = require('../index.js');
let expect = require('chai').expect;

describe('a simple beautiful coroutine runner', () => {
    it('exposes a function', () => {
        expect(typeof (run)).to.equal('function');
    });

    it('returns a promise when called and runs well', () => {
        let func = run(function* (tool, worker) {
            expect(tool).to.equal('brilliant');
            expect(worker).to.equal('fool');

            let c = yield Promise.resolve('tool');
            expect(c).to.equal('tool');
            return 'two';
        });

        func('brilliant', 'fool').then(x => expect(x).to.equal('two')).catch(e => console.log(e));
    });
});