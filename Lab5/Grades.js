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
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var row = body.insertRow();
        var nameCell = row.insertCell();
        nameCell.textContent = key;
        var gradeCell = row.insertCell();
        gradeCell.textContent = data[key];
        var editCell = row.insertCell();
        editCell.innerHTML = '<button class="edit">Edit</button>'; // Add Edit button
        var deleteCell = row.insertCell();
        deleteCell.innerHTML = '<button class="delete">Delete</button>'; // Add Delete button
      }
    }

    // Append table to the grades-table div
    var gradesTableDiv = document.querySelector('.grades-table');
    gradesTableDiv.appendChild(table);

  })
  .catch(function(err) {
    console.log("Something went wrong!", err);
  });
