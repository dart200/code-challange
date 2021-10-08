const _ = require('lodash');

function distribute(
    amount: number,
    recipients: {[key:string]: number}
): {[key: string]: number} {
    const amtDue = _.clone(recipients);
    const payout = _.mapValues(recipients, () => 0);
    let amtLeft = amount;
    
    const numNeedsPayout = () => 
        _.reduce(amtDue, (acc, val, key) => val === 0 ? acc : acc+1, 0);
    
    do {
        const needsPayout = numNeedsPayout()
        let distAmt = Math.floor(amtLeft / needsPayout);
        
        if (amtLeft < needsPayout)
            distAmt = 1;
        
        _.forEach(amtDue, (val, key) => {
            const distribute = (amt:number) => {
                const availableAmt = (amt < amtLeft) ? amt : amtLeft;
                payout[key] += availableAmt;
                amtDue[key] -= availableAmt;
                amtLeft -= availableAmt;
            };
            
            if (val < distAmt)
                distribute(val);
            else
                distribute(distAmt);
        });      
        
        // payout anyone we can first
    } while(numNeedsPayout() && amtLeft > 0);
        
    return payout;
}

function testExactlyEnough(): void {
    const result = distribute(
        40,
        { a: 10, b: 10, c: 10, d: 10 },
    )
    const passes = _.isEqual(result, { a: 10, b: 10, c: 10, d: 10 });
    console.log("Example 1: " + (passes ? 'passes' : 'fails'));
}

function testMoreThanNeeded(): void {
    const result = distribute(
        100,
        { a: 10, b: 10, c: 10, d: 10 },
    )
    const passes = _.isEqual(result, { a: 10, b: 10, c: 10, d: 10 });
    console.log("Example 1: " + (passes ? 'passes' : 'fails'));
}

function testNotEnough(): void {
    const result = distribute(
        24,
        { a: 12, b: 12, c: 12, d: 12 },
    )
    const passes = _.isEqual(result, { a: 6, b: 6, c: 6, d: 6 });
    console.log("Example 1: " + (passes ? 'passes' : 'fails'));
}

//
// Add more tests here!
//

function testUneven1() {
    const result = distribute(
        11,
        {a: 4, b: 4, c: 4}
    );
    const passes = _.isEqual(result, { a: 4, b: 4, c: 3 });
    console.log({result});
};

function testUneven2() {
    const result = distribute(
        13,
        {a: 5, b: 5, c: 5}
    );
    const passes = _.isEqual(result, { a: 5, b: 4, c: 4 });
    console.log({result});
};

function testFun() {
    const result = distribute(
        1000,
        {a: 39, b: 8, c: 10000, d:10000}
    );
    // const passes = _.isEqual(result, { a: 5, b: 4, c: 4 });
    console.log({result});
};

// testUneven1();
// testUneven2();
testFun()
// testExactlyEnough();
// testMoreThanNeeded();
// testNotEnough();