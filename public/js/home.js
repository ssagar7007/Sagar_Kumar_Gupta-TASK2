const new_customer =document.getElementById("new_customer")
const exist_customer = document.getElementById("exist_customer")
var parent = document.getElementsByTagName("body")[0];

// New Customer are added---------------------------------------
new_customer.addEventListener("click", function () {
    userDetail();
})

// Existing Customer Detail are opened ---------------------------
exist_customer.addEventListener("click", function () {
    existDetail();
})

//Some variables are declared to check which form is open i.e. form1 or form2--------------
var form1;
var form2;
var added = false;
var showing = 0;
var br = document.createElement("br");


// Function to Open input form for new customer addition -----------------------------
function userDetail() {
    if(added) {
        parent.removeChild(form2); 
    }
    console.log("first")
   
    form1 = document.createElement('form');
    form1.setAttribute('method', 'post');
    form1.setAttribute('action', '/submit_customer_detail')

  
    let customer_name = document.createElement("input");
    customer_name.setAttribute("type", "text");
    customer_name.setAttribute("name", "customer_name");
    customer_name.setAttribute("placeholder", "Full Name");
    
    
    let email = document.createElement("input");
    email.setAttribute("type", "email");
    email.setAttribute("name", "email");
    email.setAttribute("placeholder", "Enter Email id");

    let phone_number = document.createElement("input");
    phone_number.setAttribute("type", "number");
    phone_number.setAttribute("name", "phone_number");
    phone_number.setAttribute("placeholder", "Mobile no.");

    let address = document.createElement("input");
    address.setAttribute("type", "text");
    address.setAttribute("name", "address");
    address.setAttribute("placeholder", "Address");

    let submit_btn = document.createElement("button");
    submit_btn.setAttribute("type", "submit");
    submit_btn.innerText = "Submit";
    

    let reset_btn = document.createElement("button");
    reset_btn.setAttribute("type", "reset");
    reset_btn.innerText = "Reset";
    

    let cancel_btn = document.createElement("button");
    cancel_btn.setAttribute("id", "cancel");
    cancel_btn.innerText = "Cancel"
   
    cancel_btn.addEventListener("click", cancel);

    form1.appendChild(customer_name);
   
    form1.appendChild(br.cloneNode());
    form1.appendChild(email);
   
    form1.appendChild(br.cloneNode());
    form1.appendChild(phone_number);
    
    form1.appendChild(br.cloneNode());
    form1.appendChild(address);
  
    form1.appendChild(br.cloneNode());
    form1.appendChild(submit_btn);
    form1.appendChild(reset_btn);
    form1.appendChild(cancel_btn);
     
    
    parent.appendChild(form1);
    added = true;
    showing = 1;

}




// Function to open form for existing customer to check their detail ------------------------------------
function existDetail() {
    
    if (added) {
        parent.removeChild(form1); 
    }
    console.log("second")
    form2 = document.createElement('form');
    form2.setAttribute('method', 'post');
    form2.setAttribute('action', '/existing_customer_detail')

    let id = document.createElement("input");
    id.setAttribute("type", "text");
    id.setAttribute("name", "id");
    id.setAttribute("placeholder", "Enter Email ID or Customer ID");
    

    let submit_btn = document.createElement("button");
    submit_btn.setAttribute("type", "submit");
    submit_btn.innerText = "Submit"

    let reset_btn = document.createElement("button");
    reset_btn.setAttribute("type", "reset");
    reset_btn.innerText = "Reset";

    let cancel_btn = document.createElement("button");
    cancel_btn.setAttribute("type", "button");
    cancel_btn.setAttribute("id", "cancel");
    cancel_btn.innerText = "Cancel";
    cancel_btn.addEventListener("click", cancel);

    form2.appendChild(id);
    form2.appendChild(br.cloneNode());
    form2.appendChild(br.cloneNode());

    form2.appendChild(submit_btn);
    form2.appendChild(reset_btn);
    form2.appendChild(cancel_btn);

   
    parent.appendChild(form2);
    added = true;
    showing = 2;

}


// Function to cancel the form opened --------------------------------------
function cancel() {
    if (showing == 1) {
        parent.removeChild(form1);
        showing = 0;
    }
    if (showing == 2) {
        parent.removeChild(form2);
        showing = 0;
    }
    added = false;
}

