const loggedCustomer = JSON.parse(localStorage.getItem("customer"));
let customerReservations = [];
console.log(loggedCustomer)
async function fetchCustomerReservation(){
    let urlGetCustomerReservations = "http://localhost:8080/customerReservations/";
    urlGetCustomerReservations += loggedCustomer["email"];
    customerReservations = await fetchAny(urlGetCustomerReservations);

    if(customerReservations.length>0){
        displayReservations()
    }
}

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

fetchCustomerReservation()

function displayReservations(){



}