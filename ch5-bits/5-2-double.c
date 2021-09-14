#include <stdint.h>
#include <stdio.h>
#include <string.h>

void printDouble(double d) {
  char arr[32];
  double num = d;
  int i = 0;

  while (num > 0) {
    if (i == 32) {
      printf("ERROR\n");
      return;
    }

    num = (num * 2);
    if (num >= 1) {
      arr[i] = '1';
      num = num - 1;
    } else {
      arr[i] = '0';
    }

    i++;
  }

  printf("0.");
  for (int j = 0; j < i; j++) {
    printf("%c", arr[j]);
  }
  printf("\n");
};

int main() {
  printDouble(57/64.0);
}