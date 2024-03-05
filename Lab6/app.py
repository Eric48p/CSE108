from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Render the Grades.html file
@app.route('/')
def home():
    return render_template('Grades.html')

# Initialize an empty dict to store data
student_data = {}

# Displays data
@app.route('/grades', methods=['GET'])
def get_grades():
    return jsonify(student_data)

# Method to create a student with a grade
@app.route('/grades', methods=['POST'])
def create_student():
    data = request.json

    # Extract name and grade from the request data
    name = data.get('name')
    grade = data.get('grade')

    if name and grade:
        # Add the new student's grade to the dictionary
        student_data[name] = grade
        return jsonify({'message': 'Student created successfully'}), 201
    else:
        return jsonify({'error': 'Invalid data provided'}), 400

# Method to update a student's grade
@app.route('/grades/<string:name>', methods=['PUT'])
def update_grade(name):
    data = request.json
    grade = data.get('grade')
    if name in student_data and grade != '':
        student_data[name] = grade
        return jsonify({'message': 'Grade updated successfully'})
    else:
        return jsonify({'error': 'Student not found or invalid data provided'}), 404

# Method to delete a student
@app.route('/grades/<string:name>', methods=['DELETE'])
def delete_student(name):
    if name in student_data:
        del student_data[name]
        return jsonify({'message': 'Student deleted successfully'})
    else:
        return jsonify({'error': 'Student not found'}), 404

if __name__ == '__main__':
    app.run()
