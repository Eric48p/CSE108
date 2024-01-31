def main():
  word = input("Please enter a word \n")
  total = 0

  with open('PythonSummary.txt', "r") as file:
    for line in file:
      line = line.lower().replace('.', ' ').replace('-', ' ')
      words = line.split()
      total += words.count(word)

    print(total)

if __name__ == "__main__":
  main()