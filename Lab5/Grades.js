fetch("https://amhep.pythonanywhere.com/grades")
  .then(function (response) {
    return response.json() // Parse the JSON data
  })
  .then(function (data) {
    console.log(data) // Display Name and Grade data in console

    // Create table element
    var table = document.createElement("table")

    // Create table header
    var header = table.createTHead()
    var row = header.insertRow()
    var headers = ["Name", "Grade", "Edit", "Delete"]
    for (var i = 0; i < headers.length; i++) {
      var th = document.createElement("th")
      th.textContent = headers[i]
      row.appendChild(th)
    }

    // Create table body and populate data
    var body = table.createTBody()
    var filteredData = data // Initialize filtered data with all data (search bar)

    function renderTable(filteredData) {
      body.innerHTML = "" // Clear previous data
      var counter = 1
      for (var key in filteredData) {
        if (filteredData.hasOwnProperty(key)) {
          var row = body.insertRow()
          var nameCell = row.insertCell()
          if (key.includes("<")){
            key = "Dummy" + counter
            counter = counter + 1
            nameCell.textContent = key
          } else{
            nameCell.textContent = key
          }
          var gradeCell = row.insertCell()
          gradeCell.textContent = filteredData[key] + "%"
          var editCell = row.insertCell()
          editCell.innerHTML =
            '<button class="edit" onclick="editStudent(\'' +
            key +
            "')\">Edit</button>" // Add Edit button
          var deleteCell = row.insertCell()
          deleteCell.innerHTML =
            '<button class="delete" onclick="deleteStudent(\'' +
            key +
            "')\">Delete</button>" // Add Delete button
        }
      }
    }

    renderTable(filteredData) // Initial render

    // Append table to the grades-table div
    var gradesTableDiv = document.querySelector(".grades-table")
    gradesTableDiv.appendChild(table)

    // Search functionality
    var searchInput = document.querySelector("#search-input")
    searchInput.addEventListener("input", function (event) {
      var searchTerm = event.target.value.toLowerCase()
      filteredData = Object.keys(data).reduce(function (acc, key) {
        if (key.toLowerCase().includes(searchTerm)) {
          acc[key] = data[key]
        }
        return acc
      }, {})
      renderTable(filteredData)
    })
  })
  .catch(function (err) {
    console.log("Something went wrong!", err)
  })

// Function to show the overlay popup
function showPopup() {
  // Clear existing content of the popup div
  var popup = document.querySelector(".popup")
  popup.innerHTML = ""

  // Reset input field values
  resetInputFields()

  // Display the popup
  document.getElementById("overlay").style.display = "block"
}

// Function to close the overlay popup
function closePopup() {
  document.getElementById("overlay").style.display = "none"
}

// Function to reset input field values
function resetInputFields() {
  var inputFields = document.querySelectorAll(
    ".popup input[type='text'], .popup input[type='number']"
  )
  inputFields.forEach(function (input) {
    input.value = "" // Reset input field value
  })
}

// Function for when the New Student button is clicked
function newStudent() {
  showPopup()

  // Get the existing popup div
  var popup = document.querySelector(".popup")

  // Create close button
  var span = document.createElement("span")
  span.innerHTML = "&times;"
  span.className = "close"
  span.onclick = closePopup

  // Create h2 element
  var h2 = document.createElement("h2")
  h2.textContent = "Create New Student"

  // Create input for student name
  var nameInput = document.createElement("input")
  nameInput.type = "text"
  nameInput.placeholder = "Student Name"
  nameInput.id = "studentName"

  // Create input for student grade
  var gradeInput = document.createElement("input")
  gradeInput.type = "number"
  gradeInput.placeholder = "Grade"
  gradeInput.id = "studentGrade"

  // Create submit button
  var submitButton = document.createElement("input")
  submitButton.type = "submit"
  submitButton.value = "Submit"
  submitButton.onclick = createStudent

  // Append elements to popup div
  popup.appendChild(span)
  popup.appendChild(h2)
  popup.appendChild(nameInput)
  popup.appendChild(gradeInput)
  popup.appendChild(submitButton)
}

// Function for creating a new student
function createStudent() {
  // Retrieve input values
  var name = document.getElementById("studentName").value
  var grade = document.getElementById("studentGrade").value

  if (name != "" && grade != "") {
    console.log("Student Name: " + name)
    console.log("Grade: " + grade)

    const student = { name: name, grade: grade }
    fetch("https://amhep.pythonanywhere.com/grades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        // If student creation is successful, reload the page to display new student in data
        console.log("Success:", response.json())
        location.reload()
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  } else {
    console.log("Error")
  }
}

// Function for when the edit button is clicked
function editStudent(key) {
  showPopup()

  const studentName = key

  // Get the existing popup div
  var popup = document.querySelector(".popup")

  // Create close button
  var span = document.createElement("span")
  span.innerHTML = "&times;"
  span.className = "close"
  span.onclick = closePopup

  // Create h2 element
  var h2 = document.createElement("h2")
  h2.textContent = "Edit Student Grade"

  // Create input for student name
  var nameInput = document.createElement("input")
  nameInput.type = "text"
  nameInput.id = "studentName"
  nameInput.value = studentName // Set the value of the input to the key
  nameInput.readOnly = true // Make the input uneditable

  // Create input for student grade
  var gradeInput = document.createElement("input")
  gradeInput.type = "number"
  gradeInput.placeholder = "Grade"
  gradeInput.id = "studentGrade"

  // Create submit button
  var submitButton = document.createElement("input")
  submitButton.type = "submit"
  submitButton.value = "Submit"
  submitButton.onclick = function () {
    submitEditStudent(studentName)
  }

  // Append elements to popup div
  popup.appendChild(span)
  popup.appendChild(h2)
  popup.appendChild(nameInput)
  popup.appendChild(gradeInput)
  popup.appendChild(submitButton)
}

// Function for when the submit button is clicked when editing a students grade
function submitEditStudent(studentName) {
  // Get the new student grade from the input
  var grade = document.getElementById("studentGrade").value

  if (grade != "") {
    console.log("Grade: " + grade)

    const student = { grade: grade }
    fetch(`https://amhep.pythonanywhere.com/grades/${studentName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        // If grade edit is successful, reload the page to display new student's grade in data
        console.log("Success:", response.json())
        location.reload()
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  } else {
    console.log("Error")
  }
}

// Function for when you click the delete button
function deleteStudent(key) {
  // Confirm deletion with user
  var confirmation = confirm(`Are you sure you want to delete ${key}?`)

  if (confirmation) {
    // Send a DELETE request to the backend API
    fetch(`https://amhep.pythonanywhere.com/grades/${key}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Student deleted successfully.")
          // Reload the page to reflect the updated data
          location.reload()
        } else {
          console.error("Failed to delete student.")
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
}
