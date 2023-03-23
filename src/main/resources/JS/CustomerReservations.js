const loggedCustomer = JSON.parse(localStorage.getItem("customer"));
let customerReservations = [];


async function fetchCustomerReservation(){
    if (loggedCustomer != null) {
        showCustomerName(loggedCustomer);
        let urlGetCustomerReservations = "http://localhost:8080/customerReservations/";
        urlGetCustomerReservations += loggedCustomer["email"];
        customerReservations = await fetchAny(urlGetCustomerReservations);

        if (customerReservations.length > 0) {
            customerReservations.forEach(displayReservations)
        }
    } else {

        const d = document.createElement("p");
        d.innerHTML = "Log ind for at se dine bookinger";
        d.classList.add("noReservations");

        document.body.appendChild(d);
    }


}

function showCustomerName(customer) {
    const customerName = document.getElementById("customerName");
    customerName.innerHTML =
        "<div> Navn:   " + customer.firstname + " " + customer.lastname + "</div>" + "<br>" +
        "<div> Email:   " + customer.email+ "</div>" +
        "<div> Tlf. Nummer:   " + customer.number + "</div>";
}

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

fetchCustomerReservation()

function displayReservations(reservation){

    const reservationCard = document.getElementById("reservationCard");

    const reservationInfo = document.createElement("p");
    reservationInfo.innerHTML =
        "<img id='cardPic' src=\"../static/images/Billede2.png\">"+
        "<span class='resName'>" + reservation["activity"].name  + "</span>" + "<br>" +
        reservation.date + "<br>" +
        "Deltagere: " + reservation.participants + "<br>" +
        "Pris: " + reservation.price + " kr." + "<br>" +
        "Tid: " + reservation["activity"].startTime + "<br> <br>" +
        "<span class='status'>" + reservation.status +"</span>"

    const statusElement = reservationInfo.querySelector('.status');

    if (reservation.status === "PENDING") {
        statusElement.classList.add("pending");
    } else if (reservation.status === "CONFIRMED") {
        statusElement.classList.add("confirmed");
    } else if (reservation.status === "CANCELLED") {
        statusElement.classList.add("cancelled");
    }



    //reservationCard.appendChild(picture);
        reservationCard.appendChild(reservationInfo);

}
