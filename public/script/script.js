// script.js
// Get the date input element
var dateInput = document.getElementById('date');

// Calculate the number of weeks between start and end dates
var startDate = new Date('2023-12-23');
var endDate = new Date('2024-02-03');
var days = Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000));

// Increment the date by one day and add as an option to the date input if it's a Saturday
for (var i = 0; i <= days; i++) {
  var nextDate = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
  if (nextDate.getDay() === 6) {
    var formattedDate = nextDate.toISOString().split('T')[0];
    var option = document.createElement('option');
    option.value = formattedDate;
    option.textContent = formattedDate;
    dateInput.appendChild(option);
  }
}

console.log('gijs')