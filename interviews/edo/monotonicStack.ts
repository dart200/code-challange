/* 
Your previous Plain Text content is preserved below:

You are working with a team of meteorologists studying temperatures in a city. They have asked you to build a system that will track temperatures and provide metrics. 

[2 
1) the average of all temperatures from the last 24 hours, and 
2) the maximum temperature from the last 24 hours

For example, to do a metric for maximum temperature recorded for all time, your solution might look like this:

Let max = NULL

Log(temperature):
  IF max IS NULL
    Set max = temperature
  ELSE IF temperature > max
    Set max = temperature

GetMaxAllTime:
  Return max

 */

  type Temp = {t: number};
  // const tmpCmp = (tA, tB) => {tA.t - tB.t};
  
  const DAY_SECS = 86400;
  const temps: Temp[] = [];
  
  let total = 0;
  let max = Number.MIN_SAFE_INTEGRER;
  // const maxHeap = new Heap<Temp, tmpCmp>;
  
  const logTemp = (temp: number) => {
    const newTemp = {t: temp};
    temps.push(newTemp);
    total += temp;
    
    if (temp > max)
      max = temp;
  
    if (temps.length === DAY_SECS) {
      const oldTemp = temps.shift();
      total -= oldTemp.t;
      
      if (oldTemp.t === max)
        max = Number.MIN_SAFE_INTEGRER;
    }  
  };
  
  const avgTemp24 = () => {
    return total/temps.length;
  };
  
  const maxTemp24 = () => {
    if (max !== Number.MIN_SAFE_INTEGRER)
      return max;
    
    temps.forEach(temp => {
      if (temp.t > max)
        max = temp.t;
    });
    
    return max;
  };
  
  
  // data stream: 2, 5, 6, 1, -5, 4, 3, 7
  // day length = 5 steps
  // monotonic stack
  // step 1: [2] [2]
  // step 2: [5] [2,5]
  // step 3: [6]
  // step 4: [6,1]
  // step 5: [6,4]
  // step 6: [6,4,3] [6, 1, -5, 4, 3]
  // step 7: [
  
  // data: 7 6 5 4 3 2 1 0
  
  