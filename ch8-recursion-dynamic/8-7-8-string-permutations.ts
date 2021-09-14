#!/usr/bin/env ts-node-script


type StrSet = {[s: string]: true};
const dict: {[s: string]: StrSet} = {};
const recurse = (s:string): StrSet => {
  if (s.length === 1)
    return {[s]: true};
  if (dict[s])
    return dict[s];

  const perms: StrSet = {};
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    const rest
      = ((i === 0) ? '' : s.slice(0, i))
      + ((i === s.length-1) ? '' : s.slice(i+1));

    const restPerms = recurse(rest);
    Object.keys(restPerms).forEach(p => perms[c+p] = true);
  };

  return perms;
};

const stringPermutation = (s: string) => {
  const perms = recurse(s);
  return Object.keys(perms);
}

const test7 = (s:string) => { 
  const perms = stringPermutation(s);
  console.log({s, perms});
};

test7('a');
test7('aa');
test7('ab');
test7('abc');
test7('aabc');
