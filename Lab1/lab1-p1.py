def main():
  nums = input("Enter two or more numbers separated by a space \n")
  if len(nums) < 2:
    print("There should be at least two numbers provided!")
  else:
    nums = nums.split()
    total = 0
    for num in nums:
      total = total + float(num)

    print(total)

if __name__ == "__main__":
  main()
