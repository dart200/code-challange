// hotpot,
// hottop

// check to see if we can swap two characters in str2, so that str1 equals to str2
// equal strings return equalt

const checkStr = (strS: string, strT: string) => {
  if (strS.length !== strT.length)
      return false;
      
  let diffS;
  let diffT;
  let swapCheck;
  
  for (let i = 0; i < strS.length; i++) {
      const charS = strS.charAt(i);
      const charT = strT.charAt(i);
      
      if (charS !== charT) {
          if (!diffS) {
              diffS = charS;
              diffT = charT;
          } else if (!swapCheck) {
              if (diffT !== charS || diffS !== charT)  {
                  return false;
              }
              
              swapCheck = true;
          } else {
              return false;
          }
      }
  }
  
  if (diffS && !swapCheck) {
      return false;
  }
  
  return true;
};

const testCheckStr = (strS: string, strT: string, expectedRes: boolean) => {
  const res = checkStr(strS, strT);
  console.log(strS, strT, res === expectedRes ? 'pass' : 'fail');
}

// //null equal
// testCheckStr('', '', true);
// // equal
// testCheckStr('hotpot', 'hotpot', true);
// // one char swap
// testCheckStr('hotpot', 'hottop', true);
// // two char swap
// testCheckStr('ab', 'ba', true);
// // one char diff
// testCheckStr('a', 'b', false);
// // two char swap
// testCheckStr('abcd', 'adcb', true);
// // three char swap
// testCheckStr('abcd', 'adbc', false);

// // diff lengths
// testCheckStr('abcde', 'adbc', false);
// // one char swap
// testCheckStr('abcd', 'aecd', false);


const anagramCheck = (strS: string, strT: string, degreeDiff: number) => {
  if (strS.length !== strT.length)
      return false;
      
  // produces hashmap of chars that stores num of each chars
  const mapStr = (str: string) => {
      const charMap: {[id:string]: number} = {};

      str.split('').forEach(c => {            
          if (!charMap[c])
              charMap[c] = 1;
          else
              charMap[c] += 1;
      });

      return charMap;
  };
  
  const mapS = mapStr(strS);
  const mapT = mapStr(strT);
  
  let numSame = 0;
  // iterates over produced map, to check each char for potential differences
  Object.keys(mapS).forEach(c => {
      const numS = mapS[c] || 0;
      const numT = mapT[c] || 0;
      
      if (numS <= numT) {
          numSame += numS
      } else {
          numSame += numT
      }
  });

  const numDiffs = strS.length - numSame;
  if (numDiffs > degreeDiff) 
      return false;
  else
      return true;
};

// abcd
// acfg
// degreeDiff: 2


// anagram
// grammar
// k = 2


const testAnagramCheck = (strS: string, strT: string, degreeDiff: number, expectedRes: boolean) => {
  const res = anagramCheck(strS, strT, degreeDiff);
  console.log(strS, strT, degreeDiff, res === expectedRes ? 'pass' : 'fail');
}

testAnagramCheck('abcd', 'acfz', 2, true);
testAnagramCheck('anagram', 'grammar', 2, true);
testAnagramCheck('anagram', 'grammar', 3, true);


testAnagramCheck('abdc', 'acfz', 1, false);
testAnagramCheck('anagram', 'grammar', 1, false);
