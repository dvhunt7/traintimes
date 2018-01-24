  const config = {
    apiKey: "AIzaSyArW2MvnA0BjnmsN7qXa7wsCEm0aDVF7zs",
    authDomain: "test-499da.firebaseapp.com",
    databaseURL: "https://test-499da.firebaseio.com",
    projectId: "test-499da",
    storageBucket: "test-499da.appspot.com",
    messagingSenderId: "828735960377"
  };
  firebase.initializeApp(config);

const dbRef = firebase.database().ref('Trains/traininfo');


$("#add-train-btn").click(function(event) {
  

  event.preventDefault();


  const newtrain = {
    name: $("#name-input").val().trim(),
    destination: $("#destination-input").val().trim(),
    frequency: $("#frequency-input").val().trim(),
    nextarrival: $("#next-input").val().trim(),
    //minutesaway: $("#minutes-input").val().trim(),
  };


  dbRef.push(newtrain);

  console.log(newtrain);
  
  resetInputs();
  
});


dbRef.on("child_added", function(childSnapshot, prevChildKey) {


  const newtrain = childSnapshot.val();
  console.log(newtrain);
  


  $("#traintable > tbody").append(createTrainRow(newtrain));
});

function createTrainRow(train) {
  const trow = $('<tr>');
  trow.append(`<td>${train.name}</td>`)
      .append(`<td>${train.destination}</td>`)
      .append(`<td>${train.frequency}</td>`)
      .append(`<td>${train.nextarrival}</td>`)
      //.append(`<td>${train.minutesaway}</td>`);

  return trow;
}

function resetInputs() {

  $("form input:not([submit])").val('');
  $("#employee-name-input").focus();
}
