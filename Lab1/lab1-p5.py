import json

class Student:
  def __init__(self, name, grade):
    self.name = name
    self.grade = grade

  def create_student(self, name, grade):
    with open('grades.txt', 'r') as file:
      data = json.load(file)

    data[name] = grade

    with open('grades.txt', 'w') as file:
      json.dump(data, file)
    print(name, "has now been created with a grade of", grade, "%")

  def view_grade(self, name):
    with open('grades.txt', 'r') as file:
      data = json.load(file)
      for key in data:
        if key == name:
          print(name, "has a grade of", data.get(name), "% \n")
        
  def edit_grade(self, name):
    with open('grades.txt', 'r') as file:
      data = json.load(file)
      for key in data:
        if key == name:
          print("Their current grade is:", data.get(name), "%, what would you like to change it to?")
          new_grade = input()
          data[name] = new_grade
          with open('grades.txt', 'w') as file:
            json.dump(data, file)
          print("Their new grade is now", new_grade, "%")
  
  def delete_grade(self, name):
    with open('grades.txt', 'r') as file:
      data = json.load(file)
      for key in data:
        if key == name:
          data[name] = 'N/A'
          with open('grades.txt', 'w') as file:
            json.dump(data, file)
          print("Their grade has been deleted")
    

def main():
  selection = 99

  while selection != 5:
    print("Please select an option: \n")
    print("1. Create a student with a grade \n2. View grade \n3. Edit grade \n4. Delete grade \n5. Exit \n")
    selection = int(input())

    if selection == 1:
      name = input("Please enter a first and last name \n")
      grade = float(input("Please enter a grade \n"))

      student = Student(name, grade)
      student.create_student(name, grade)

      selection = 0
    
    elif selection == 2:
      print("Please enter the student's grade you are trying to view")
      name = input()

      student = Student(name, 0)
      student.view_grade(name)

      selection = 0

    elif selection == 3:
      print("Whos grade would you like to edit?")
      name = input()

      student = Student(name, 0)
      student.edit_grade(name)

      selection = 0
    
    elif selection == 4:
      print("Whos grade would you like to delete?")
      name = input()

      student = Student(name, 0)
      student.delete_grade(name)

      selection = 0
      # If name is in the existing data, set grade to N/A

    elif selection == 5:
      print("Program Closed!")
      break


if __name__ == "__main__":
  main()
    