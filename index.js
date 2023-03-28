const express = require("express")
const app = express();
const db = require("./database/init").db;

var customer;
var stopIt;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set("views", "./views");
app.listen(3000, function()
{
	console.log("server is live")
})

// All path to route------------------------------------------------------------------
app.route("/").get(Home);
app.route("/submit_customer_detail").post(handle_customer_detail_submit);
app.route("/existing_customer_detail").post(existingCustomer);
app.route("/booking_detail").get(bookingDetail).post(newBooking);
app.route("/delete_booking_detail").post(deleteBooking);
app.route("/edit_booking_detail").post(editBooking);
app.route("/edit_customer_detail").post(editCustomer);
/////////////////////////////////////////////////////////////////////////////////////////


//Functoin to handle Home request------------------
function Home(req, res) {
    res.render("home",{message:false,all:false,already:false});
}


//Function to handle New customer submit detail----------------------------------------
function handle_customer_detail_submit(req,res){
    customer = req.body;
    let sql = "SELECT * from customer_table where email = ?";
    db.query(sql, [customer.email], function (err, result) {
        if (err) {
            throw err;
        }
        else {
               var str = JSON.stringify(result);
                var json = JSON.parse(str);
                if (json.length != 0) {
                    res.render("home", { message:false ,all:false,already:true});
            }
                else {
                    


        if (customer.customer_name && customer.email && customer.phone_number && customer.address) {

            let sql = "INSERT INTO customer_table (customer_name,email,phone_number,address)VALUES (?,?,?,?)";
            db.query(sql, [customer.customer_name, customer.email, customer.phone_number, customer.address], function (err, result) {
                if (err) {
                    res.send("Error occured - " + err);
                }
                else {
                    res.redirect("/booking_detail");
                }
            })
        }
        else {
            res.render("home", { message: false, all: true,already:false });
                    }
                }
            }
        })
 
}
////////////////////////////////////////////////////////////////////////////////////////////

//Function to handle existing customer ------------------------------------------
function existingCustomer(req,res) {
    let data = req.body;
    customer = { customer_id: data.id, email: data.id }
     
    // function call to access booking detail of requesting customer id 
    bookingDetail(req, res);
}
/////////////////////////////////////////////////////////////////////////////////////////



//Function to get booking detail of customer------------------------------------------------------
function bookingDetail(req, res) {
    if (customer == undefined) {
        res.render("home",{message:false,all:false,already:false});
    }
    else {
        let sql = "SELECT * from customer_table where email = ? OR customer_id = ?";
        db.query(sql, [customer.email, customer.customer_id], function (err, result) {
            if (err) {
                throw err;
            }
            else {
                var str = JSON.stringify(result);
                var json = JSON.parse(str);
                if (json.length == 0) {
                    stopIt = true;
                    console.log("called..")
                    res.render("home", { message: true ,all:false,already:false});
                }
                else {
                
            
                    customer = json[0];
                    let sql2 = "SELECT * from booking_table where customer_id = ?";
                    // console.log("after - " + customer.customer_id);
           
                    db.query(sql2, [customer.customer_id], function (err2, result2) {
                        if (err2) {
                            throw err2;
                        }
                        else {
                            let str2 = JSON.stringify(result2);
                            var json2 = JSON.parse(str2);
               
                            json2.forEach(element => {
                                let bookdate = new Date(element.booking_date)
                                let date2 = bookdate.toLocaleDateString();
                                element.booking_date = date2;
                                let createddate = new Date(element.created_time)
                                let date3 = createddate.toLocaleString();
                                element.created_time = date3;
                            });
                
                   
                            res.render("booking", { info: json[0], info2: json2, message: false });
                        }
                    })
                }
            
            }
        })
    }
    

}
////////////////////////////////////////////////////////////////////////////////////////////////////



//  Handle New booking to drone shot -------------------------------------------------------
function newBooking(req, res) {
    
    let data2 = req.body;
    let sql3 = "INSERT INTO booking_table (location_id,drone_shot_id,booking_date,customer_id)VALUES (?,?,?,?)";
    db.query(sql3,[data2.location_id,data2.drone_shot_id,data2.booking_date,customer.customer_id], function (err, result) {
        if (err) {
            res.send("Error occured - " + err);
        }
        else {
        
            res.redirect("/booking_detail");
        }
    })
   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////


//  Delete the booking detail--------------------------
function deleteBooking(req, res) {
    let id = req.body.id;
    let sql4 = "DELETE FROM booking_table where booking_id = ?";
    db.query(sql4, [id], function (err4, result4) {
        if (err4) {
            throw err4;
        }
        else {
            bookingDetail(req, res);
        }
    })
    
}
///////////////////////////////////////////////////////////////////////////////////


// Update the booking detail -----------------------------------------------------------------
function editBooking(req, res) {
    let {booking_id,location_id,drone_shot_id,booking_date} = req.body;
    let sql5 = "UPDATE booking_table SET location_id = ?,drone_shot_id = ?, booking_date = ? where booking_id = ?";
    db.query(sql5, [location_id, drone_shot_id, booking_date, booking_id], function (err5, result5) {
        if (err5) {
            throw err5;
        }
        else {
            bookingDetail(req, res);
        }
    })
}
///////////////////////////////////////////////////////////////////////////////////////////////



// Update the customer personal detail -------------------------------------------------------
function editCustomer(req, res) {
    let {customer_id,customer_name, email, phone_number, address} = req.body;
    let sql5 = `UPDATE customer_table SET customer_name = ?,email = ?, phone_number = ?,address = ? where customer_id = ?`;
    db.query(sql5, [customer_name, email, phone_number, address ,customer_id], function (err5, result5) {
        if (err5) {
            throw err5;
        }
        else {
            bookingDetail(req, res);
        }
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////