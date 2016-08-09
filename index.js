'use strict';

function dealWithIterator(iter, passIn) {
    return new Promise((resolve, reject) => {
        if (typeof (iter.next) !== 'function') {
            throw new Error('expecting method handler to return an iterator');
        }

        let ite = iter.next(passIn);
        if (ite.done === true) {
            resolve(ite.value);
            return;
        }

        if ((ite.value instanceof Promise)) {
            ite.value.then(res => {
                dealWithIterator(iter, res).then(resolve).catch(reject);
            });
        } else {
            dealWithIterator(iter, ite.value).then(resolve).catch(reject);
        }
    });
}

module.exports = function coRunnerGet(generator) {
    return function coRunner(...args) {
        if (typeof (generator) !== 'function') {
            throw new TypeError(`expected argument to be a function found ${typeof (generator)} instead`);
        }

        let iter = generator(...args);
        return dealWithIterator(iter);
    };

};