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
        || foundPnt > highPnt) break;
    } while (true);

    console.log({foundPnt, midStr});

    if (midStr === s)
      return foundPnt;

    // not found once lowPnt is checked
    if (midPnt === lowPnt)
      return undefined;

    const searchLow = () => highPnt = midPnt;
    const searchHigh = () => lowPnt = foundPnt+1;

    if (!midStr) // never found a str cause end was blank filled
      searchLow();
    else if (s.localeCompare(midStr) < 0)
      searchLow();
    else
      searchHigh();
  } while (true);
};

const test5 = (arr: string[], s: string) => {
  const res = sparseSearch(arr, s);
  console.log(arr, s, res);
};

const testArr = ['at', 'ay', '', '', 'ball', '', '', '', 'car', '', '', 'dad', '', '', '', '', '', '', '', '', '', '', 'eat'];
test5(testArr, 'eat');