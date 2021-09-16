#!/usr/bin/env ts-node-script

// 40 mins

const sparseSearch = (arr: string[], s: string) => {
  let lowPnt = 0;
  let highPnt = arr.length-1;

  do {
    const midLen = Math.floor((highPnt-lowPnt)/2);
    const midPnt = lowPnt + midLen;
    let midStr;
    
    // search up string for non-empty space
    let foundPnt = midPnt;
    do {
      midStr = arr[foundPnt];
      if (midStr) break;
      
      foundPnt++;
      if (foundPnt === arr.length
        || foundPnt === highPnt) break;
    } while (true);

    if (midStr === s)
      return foundPnt;

    // not found once lowPnt is checked
    if (midPnt === lowPnt)
      return undefined;

    const searchLeft = () => highPnt = midPnt;
    const searchRight = () => lowPnt = foundPnt;

    if (!midStr) // never found a str cause end was blank filled
      searchLeft();
    else if (s.localeCompare(midStr) < 0)
      searchLeft();
    else
      searchRight();
  } while (true);
};

const test5 = (arr: string[], s: string) => {
  const res = sparseSearch(arr, s);
  console.log(arr, s, res);
};

const testArr = ['at', '', '', '', 'ball', '', '', '', 'car', '', '', 'dad', '', '', '', '', '', '', '', '', '', ''];
test5(testArr, 'car');