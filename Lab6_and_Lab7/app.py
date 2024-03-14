from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///grades.sqlite"
db = SQLAlchemy(app)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, unique=True, nullable=False)
    grade = db.Column(db.Integer, nullable=False)


# Render the Grades.html file
@app.route('/')
def home():
    return render_template('Grades.html')


# Displays data
@app.route('/grades', methods=['GET'])
def get_grades():
    try:
        students = Student.query.all()
        student_list = [{"id": student.id, "name": student.name, "grade": student.grade} for student in students]
        return jsonify(student_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Method to create a student with a grade
@app.route('/grades', methods=['POST'])
def create_student():
    data = request.json

    # Extract name and grade from the request data
    name = data.get('name')
    grade = data.get('grade')

    if name and grade:
        # Retrieve the last student's ID from the database
        last_student_id = Student.query.order_by(Student.id.desc()).first().id if Student.query.count() > 0 else -1
        new_student_id = last_student_id + 1

        # Create a new student with the generated ID
        new_student = Student(id=new_student_id, name=name, grade=grade)
        db.session.add(new_student)
        db.session.commit()

        return jsonify({'message': 'Student created successfully', 'id': new_student_id}), 201
    else:
        return jsonify({'error': 'Invalid data provided'}), 400


# Method to update a student's grade
@app.route('/grades/<int:id>', methods=['PUT'])
def update_grade(id):
    data = request.json
    grade = data.get('grade')

    # Find the student by ID
    student = Student.query.get(id)

    if student:
        # Update the student's grade
        student.grade = grade
        db.session.commit()  # Save changes
        return jsonify({'message': 'Grade updated successfully'})
    else:
        return jsonify({'error': 'Student not found or invalid data provided'}), 404


# Method to delete a student
@app.route('/grades/<int:id>', methods=['DELETE'])
def delete_student(id):
    try:
        # Find the student by their ID
        student = Student.query.get(id)

        if student:
            # Delete the student from the database
            db.session.delete(student)
            db.session.commit()
            return jsonify({'message': 'Student deleted successfully'})
        else:
            return jsonify({'error': 'Student not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run()
