function find_min(A) {
  var ans = 0;
  for (var i = 1; i < A.length; i++) {
      if (ans > A[i]) {
          ans = A[i];
      }
  }
  return ans;
}