
/* 
  Your previous Plain Text content is preserved below:

  Given two lists of time intervals, return one list of merged non-overlapping time intervals:

  inputA = [[4,5], [8,10]]  
  inputB = [[3,5], [9,11], [14, 20]]
  output: [[3,5], [8,11], [14, 20]]
*/

type Interval = [number, number];
const mergeIntervals = (inputA: Interval[], inputB: Interval[]) => {
  let ai = 0;
  let bi = 0;
  const output: Interval[] = [];
  
  while (ai < inputA.length || bi < inputB.length) {
    const curInt = output[output.length-1]; // undefined on first interaction;
    const hasA = ai < inputA.length;
    const intA = inputA[ai];
    const hasB = bi < inputB.length;
    const intB = inputB[bi];
    
    if (curInt) {
      if (hasA && intA[0] < curInt[1]) {
        if (intA[1] > curInt[1])
          curInt[1] = intA[1];
        
        ai++;
        continue;
      }
      
      if (hasB && intB[0] < curInt[1]) {
        if (intB[1] > curInt[1])
          curInt[1] = intB[1];
      
        bi++;
        continue;
      }
    }
    
    if (!hasA) {
      output.push(intB);
      bi++;
    } else if (!hasB) {
      output.push(intA); 
      ai++;
    } else if (intA[0] < intB[0]) {
      output.push(intA);
      ai++;
    } else {
      output.push(intB);     
      bi++;
    }
  };
  
  return output;
};

const out = mergeIntervals(
  [[4,5], [8,10]],
  [[3,5], [9,11], [14, 20]],
);

console.log(out);
