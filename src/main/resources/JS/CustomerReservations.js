const loggetCustomer = JSON.parse(localStorage.getItem("customer"));
let customerReservations = [];
console.log(loggetCustomer)
async function fetchCustomerReservation(){
    let urlGetCustomerReservations = "http://localhost:8080/customerReservations/";
    urlGetCustomerReservations += loggetCustomer["email"];
    customerReservations = await fetchAny(urlGetCustomerReservations);

    console.log(customerReservations)
}

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

fetchCustomerReservation()