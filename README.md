## CoRunner

corunner is a lightweight (`<50 LOC`) coroutine library, for use with javascript generators

## Installation
    npm install --save corunner

## Usage
```javascript
    let run = require('corunner');
    
    let func = run(function *(firstname, secondname) {
   
        // yield Promises for synchronous looking, async code
        let email = yield Promise.resolve('name@email.com');

        // the returned value will be resolve in the returned promise
        return `${firstname} ${secondname} ${email}`;
    });
    
    // func is now a function that returns a Promise
    func('Allan', 'Ross').then(description => {
        console.log(description === 'Allan Ross name@email.com')
    }).catch(console.error);
```