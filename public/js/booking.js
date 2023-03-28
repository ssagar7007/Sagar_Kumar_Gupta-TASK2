const book_btn = document.getElementById("new_book");
const table = document.getElementsByTagName("table")[0];
const holder = document.getElementById("holder");


var inp1, inp2, inp3, inp4, inp5;
var newData;

// Function to Book New Drone Shot - it will open form dynamically to get detail of form -----------------------
book_btn.addEventListener("click",function() {
    book_btn.setAttribute('disabled','');
  newData = document.createElement("div");
  let locId = document.createElement("span");
  locId.innerText = "Location ID";
    inp1 = document.createElement("input")
  inp1.setAttribute("type", "number");
  
  let shotId = document.createElement("span");
  shotId.innerText = "Drone Shot ID";
    inp2 = document.createElement("input")
  inp2.setAttribute("type", "number");
  
  let bookDate = document.createElement("span");
  bookDate.innerText = "Booking Date";
    inp3 = document.createElement("input")
    inp3.setAttribute("type", "date");
    inp4 = document.createElement("button")
    inp4.innerText = "Book";
    inp4.addEventListener('click',book)
    inp5 = document.createElement("button")
    inp5.innerText = "Cancel";
    inp5.addEventListener('click', cancel);
     
  newData.appendChild(locId);
  newData.appendChild(inp1);
  newData.appendChild(shotId);
  newData.appendChild(inp2);
  newData.appendChild(bookDate);
    newData.appendChild(inp3);
    newData.appendChild(inp4);
    newData.appendChild(inp5);

    holder.appendChild(newData);
    
})
/////////////////////////////////////////////////////////////////////////////////////
  

//Function to cancel the form opened to Book new drone shot -----------------------------------
function cancel() {
    table.removeChild(newData);
    book_btn.removeAttribute('disabled', '');
    inp1 = inp2 = inp3 = inp4 = inp5 = '';
    newData = '';
}
/////////////////////////////////////////////////////////////////////////////////////////////



//Function to send the data to server for booking -----------------------------------------
function book() {
    let data = { location_id: inp1.value, drone_shot_id: inp2.value, booking_date: inp3.value };

    var request = new XMLHttpRequest();
    request.open("POST","/booking_detail");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(data));
    
    request.addEventListener("load", function()
    {
      if(request.status !== 200)
      {
        console.log("Error!!!");
      }
      else
      { 
          console.log("added!!!");
          location.reload();
      }
    })

}
//////////////////////////////////////////////////////////////////////////////////////////
  
  
// Listener function to handle Edit and Delete to Booking detail-----------------------------------
table.addEventListener('click', function (event) {
  if (event.target.className === "edit") {
      //Open Edit Box to edit details of booking 
      editPopup(event);
    }
    if (event.target.className === "delete") {
       
        let data = { id: event.target.parentElement.parentElement.id };
        var request = new XMLHttpRequest();
        request.open("POST","/delete_booking_detail");
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify(data));
        
        request.addEventListener("load", function()
        {
          if(request.status !== 200)
          {
            console.log("Error!!!");
          }
          else
          { 
              console.log("added!!!");
              location.reload();
          }
        })
  }
    if (event.target.className === "cancelUpdate_btn") {
     
      location.reload();
  }
    if (event.target.className === "book_update_btn") {
      console.log("book_update..... ");
     
      let booking_date_element = event.target.parentElement.previousElementSibling;
      let created_time_element = booking_date_element.previousElementSibling;
      let drone_shot_id = created_time_element.previousElementSibling;
      let location_id = drone_shot_id.previousElementSibling;
      
      let booking_id = location_id.previousElementSibling;
      let data = { booking_id: booking_id.innerText, location_id: location_id.firstElementChild.value, drone_shot_id: drone_shot_id.firstElementChild.value, booking_date: booking_date_element.firstElementChild.value };
      console.log(data)
     var request = new XMLHttpRequest();
      request.open("POST","/edit_booking_detail");
      request.setRequestHeader("Content-Type","application/json");
      request.send(JSON.stringify(data));
      
      request.addEventListener("load", function()
      {
        if(request.status !== 200)
        {
          console.log("Error!!!");
        }
        else
        { 
            console.log("added!!!");
            location.reload();
        }
      })
      
  }
  

})
////////////////////////////////////////////////////////////////////////////////////////


//Function to Open popup to edit booking detail-------------------------------------------
function editPopup(event) {
  
  let booking_date_element = event.target.parentElement.previousElementSibling;

  let created_time_element = booking_date_element.previousElementSibling;

  let drone_shot_id = created_time_element.previousElementSibling;
  let location_id = drone_shot_id.previousElementSibling;
  let booking_id = location_id.previousElementSibling;
 
  let par = document.getElementById(booking_id.innerText);

  let prevLocation = par.firstElementChild.nextElementSibling;
  let prevLocationValue = prevLocation.innerText;
  prevLocation.innerHTML = `<input type="number" value=${prevLocationValue}></input>`

  let prevShotid = prevLocation.nextElementSibling;
  let prevShotidValue = prevShotid.innerText;
  prevShotid.innerHTML = `<input type="number" value=${prevShotidValue}></input>`

  let prevBookdate = prevShotid.nextElementSibling.nextElementSibling;
  let prevBookdateValue = prevBookdate.innerText;
  
  // function is called to convert date format 
  let prevDate = convertDate(prevBookdateValue);
 
  prevBookdate.innerHTML = `<input type="date" value=${prevDate}></input>`

  let prevEditBtn = prevBookdate.nextElementSibling;
  prevEditBtn.innerHTML = `<button class= "book_update_btn">Update</button>`
  
  let prevCancelBtn = prevBookdate.nextElementSibling.nextElementSibling;
  prevCancelBtn.innerHTML = `<button class= "cancelUpdate_btn">Cancel</button>`

}
//////////////////////////////////////////////////////////////////////////////////////////


//Function to convert the format of Date-----------------------
function convertDate(d) {
  let obj = new Date(d);
  let day = obj.getDate();
  let month = obj.getMonth();
  month = month + 1;
  let year = obj.getFullYear();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
}
//////////////////////////////////////////////////////////////////


//Adding listener to handle Edit customer detail------------------
document.getElementById("edit_customer_detail_btn").addEventListener('click', editCustomerDetail);
/////////////////////////////////////////////////////////


//Function to handle edit Customer Detail------------------------------------
function editCustomerDetail() {
  let show = document.getElementById("show_customer_detail");
  let elementName = show.firstElementChild;
  let elementEmail = elementName.nextElementSibling;
  let elementPhone = elementEmail.nextElementSibling;
  let elementAddress = elementPhone.nextElementSibling;
  let elementId = elementAddress.nextElementSibling;
  let elementDetailUpdateBtn = elementId.nextElementSibling;

  elementName.innerHTML = `<input type="text" value= ${elementName.innerText}></input>`
  elementEmail.innerHTML = `<input type="email" value= ${elementEmail.innerText}></input>`
  elementPhone.innerHTML = `<input type="email" value= ${elementPhone.innerText}></input>`
  elementAddress.innerHTML = `<input type="email" value= ${elementAddress.innerText}></input>`

  let updateBtn = document.createElement("button");
  updateBtn.innerText = "Update";
  updateBtn.addEventListener('click', () => {
    console.log("detail upated...");
    updateCustomer();
  });
  let cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.addEventListener('click', () => {
    location.reload();
  });
  show.removeChild(elementDetailUpdateBtn);
  show.appendChild(updateBtn);
  show.appendChild(cancelBtn);


}
//////////////////////////////////////////////////////////////////////////////


//Function to Send Updated customer detail to server ---------------------------------------------------
function updateCustomer(){
  let show = document.getElementById("show_customer_detail");
  let elementName = show.firstElementChild;
  let elementEmail = elementName.nextElementSibling;
  let elementPhone = elementEmail.nextElementSibling;
  let elementAddress = elementPhone.nextElementSibling;
  let elementId = elementAddress.nextElementSibling;
  
  let data = { customer_id: elementId.innerText,customer_name: elementName.firstElementChild.value, email: elementEmail.firstElementChild.value, phone_number: elementPhone.firstElementChild.value, address: elementAddress.firstElementChild.value };
  console.log(data);

  var request = new XMLHttpRequest();
  request.open("POST","/edit_customer_detail");
  request.setRequestHeader("Content-Type","application/json");
  request.send(JSON.stringify(data));
  
  request.addEventListener("load", function()
  {
    if(request.status !== 200)
    {
      console.log("Error!!!");
    }
    else
    { 
        console.log("added!!!");
        location.reload();
    }
  })

}
///////////////////////////////////////////////////////////////////////////////////////////