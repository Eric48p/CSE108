class Course:
  def __init__(self, department, course_number, course_name, credits, lecture_days, start_time, end_time, average_grade):
    self.department = department
    self.course_number = course_number
    self.course_name = course_name
    self.credits = credits
    self.lecture_days = lecture_days
    self.start_time = start_time
    self.end_time = end_time
    self.average_grade = average_grade
    
  def class_schedule_formatter(self):
    output = f"{self.department}{self.course_number}: {self.course_name}\n" \
            f"Number of Credits: {self.credits}\n" \
            f"Days of Lectures: {self.lecture_days}\n" \
            f"Lecture Time: {self.start_time} - {self.end_time}\n" \
            f"Stat: on average, students get {self.average_grade}% in this course\n\n"

    return output

def main():
  courses = []
  with open('classesInput.txt', 'r') as file:
    total_courses = int(file.readline())
    for line in range(total_courses):
      department = file.readline().strip()
      course_number = file.readline().strip()
      course_name = file.readline().strip()
      credits = file.readline().strip()
      lecture_days = file.readline().strip()
      start_time = file.readline().strip()
      end_time = file.readline().strip()
      average_grade = file.readline().strip()

      course = Course(department, course_number, course_name, credits, lecture_days, start_time, end_time, average_grade)
      courses.append(course)
  
  with open('classesOutput.txt', "w") as file:
    for i, course in enumerate(courses, 1):
      file.write(f"COURSE {i}: ")
      file.write(course.class_schedule_formatter())
  
if __name__ == "__main__":
  main()
