def main():
  sentence = input("Please enter a sentence \n")
  count = int(input("How many times would you like to repeat that sentence \n"))
  i = 0
  with open('CompletedPunishment.txt', "w") as file:
    while i <= count:
      file.write(sentence + "\n")
      i += 1

if __name__ == "__main__":
  main()
