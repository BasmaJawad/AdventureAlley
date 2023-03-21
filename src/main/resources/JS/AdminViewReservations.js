
let pendingReservations = [];
async function fetchPendingReservations(){

        const getPendingReservations = "http://localhost:8080/reservationsByStatus/PENDING";
        pendingReservations = await fetchAny(getPendingReservations);

        if (pendingReservations.length > 0) {
            pendingReservations.forEach(displayReservations)
        }


}

fetchPendingReservations()
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}
function displayReservations(reservation, index){
    const reservationDiv = document.getElementById("reservationDiv");

    const reservationCard = document.createElement("div");

    reservationCard.innerHTML =
        "<span>" + reservation["activity"].name  + "</span>" + "<br>" +
        reservation.date + "<br>" +
        "Deltagere: " + reservation.participants + "<br>" +
        "Pris: " + reservation.price + " kr." + "<br>" +
        "Tid: " + reservation["activity"].startTime + "<br>" +
        reservation.status + "<br>" +
        "<button id='confirmReservation" + index + "' value='" + reservation +"'>Godkend booking</button>"

    reservationDiv.appendChild(reservationCard);

    const confirmReservationBtn = document.getElementById("confirmReservation" + index);

    confirmReservationBtn.addEventListener('click', () => confirmReservation(reservation));
}

function confirmReservation(reservation){

    console.log(reservation["reservationID"])
    const reservationId = reservation["reservationID"];

    let url = "http://localhost:8080/updateReservationStatus/PAYED/" + reservationId;
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (!response.ok) {
            console.log("Det gik ikke godt med update");
        };
    })
}



