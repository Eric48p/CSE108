fetch('https://amhep.pythonanywhere.com/grades')
  .then(function(response) {
    return response.json(); // Parse the JSON data
  })
  .then(function(data) {
    console.log(data) // Display Name and Grade data in console

    // Create table element
    var table = document.createElement('table');
      
    // Create table header
    var header = table.createTHead();
    var row = header.insertRow();
    var headers = ['Name', 'Grade', 'Edit', 'Delete'];
    for (var i = 0; i < headers.length; i++) {
      var th = document.createElement('th');
      th.textContent = headers[i];
      row.appendChild(th);
    }

    // Create table body and populate data
    var body = table.createTBody();
    var filteredData = data; // Initialize filtered data with all data
    
    function renderTable(filteredData) {
      body.innerHTML = ''; // Clear previous data
      for (var key in filteredData) {
        if (filteredData.hasOwnProperty(key)) {
          var row = body.insertRow();
          var nameCell = row.insertCell();
          nameCell.textContent = key;
          var gradeCell = row.insertCell();
          gradeCell.textContent = filteredData[key];
          var editCell = row.insertCell();
          editCell.innerHTML = '<button class="edit">Edit</button>'; // Add Edit button
          var deleteCell = row.insertCell();
          deleteCell.innerHTML = '<button class="delete">Delete</button>'; // Add Delete button
        }
      }
    }
    
    renderTable(filteredData); // Initial render

    // Append table to the grades-table div
    var gradesTableDiv = document.querySelector('.grades-table');
    gradesTableDiv.appendChild(table);
    
    // Search functionality
    var searchInput = document.querySelector('#search-input');
    searchInput.addEventListener('input', function(event) {
      var searchTerm = event.target.value.toLowerCase();
      filteredData = Object.keys(data).reduce(function(acc, key) {
        if (key.toLowerCase().includes(searchTerm)) {
          acc[key] = data[key];
        }
        return acc;
      }, {});
      renderTable(filteredData);
    });

  })
  .catch(function(err) {
    console.log("Something went wrong!", err);
  });


document.addEventListener("DOMContentLoaded", function() {
  // Event listener for the "New Student" button click
  document.getElementById("new-student-button").addEventListener("click", function() {
    showPopup();
  });
});

// Function to show the overlay popup
function showPopup() {
  // Reset input field values
  resetInputFields();
  document.getElementById("overlay").style.display = "block";
}

// Function to close the overlay popup
function closePopup() {
  document.getElementById("overlay").style.display = "none";
}

// Function to reset input field values
function resetInputFields() {
  var inputFields = document.querySelectorAll(".popup input[type='text'], .popup input[type='number']");
  inputFields.forEach(function(input) {
    input.value = ""; // Reset input field value
  });
}
  

