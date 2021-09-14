#include <stdint.h>
#include <stdio.h>

int insert(uint32_t n, uint32_t m, int i, int j) {
  const int len = j-i+1;
  uint32_t ret = n;

  // create clear masks;
  int clear_mask = 1;
  for (int k=0; k<len-1; k++) {
    clear_mask = clear_mask << 1;
    clear_mask = clear_mask | 1;
  }
  clear_mask = clear_mask << i;

  // clear range we are setting
  ret = n & (~clear_mask);

  // set bits within range we are setting
  ret = ret | (m << i);

  return ret;
};

int main() {
  int ret1 = insert(0b10000000000, 0b10011, 2, 6);
  printf("0x%X\n", ret1);

  int ret2 = insert(0b10001100000, 0b10011, 2, 6);
  printf("0x%X\n", ret1);
}