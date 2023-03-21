const loggedCustomer = JSON.parse(localStorage.getItem("customer"));
let customerReservations = [];


async function fetchCustomerReservation(){
    let urlGetCustomerReservations = "http://localhost:8080/customerReservations/";
    urlGetCustomerReservations += loggedCustomer["email"];
    customerReservations = await fetchAny(urlGetCustomerReservations);

    if(customerReservations.length>0){
        customerReservations.forEach(displayReservations)
    }
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
        "<img id='cardPic' src=\"../static/images/womanPaint.png\">"+
        "<span>" + reservation["activity"].name  + "</span>" + "<br>" +
        reservation.date + "<br>" +
        "Deltagere: " + reservation.participants + "<br>" +
        "Pris: " + reservation.price + " kr." + "<br>" +
        "Tid: " + reservation["activity"].startTime + "<br>" +
        reservation.status;

    //reservationCard.appendChild(picture);
        reservationCard.appendChild(reservationInfo);

}