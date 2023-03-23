let pendingReservations = [];
let confirmedReservations = [];

async function fetchPendingReservations() {

    const getPendingReservations = "http://localhost:8080/reservationsByStatus/PENDING";
    pendingReservations = await fetchAny(getPendingReservations);

    if (pendingReservations.length > 0) {
        pendingReservations.forEach(displayReservations)
    }
}

fetchPendingReservations()



async function fetchConfirmedReservations() {

    const getConfirmedReservations = "http://localhost:8080/reservationsByStatus/CONFIRMED";
    confirmedReservations = await fetchAny(getConfirmedReservations);

    if (confirmedReservations.length > 0) {
        confirmedReservations.forEach(displayConfirmedReservations)
    }
}

fetchConfirmedReservations()


function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

function displayReservations(reservation, index) {


    const tablebody = document.getElementById("tableBody")
    const tr = document.createElement("tr")
    const getCustomer = reservation.customer
    console.log(getCustomer.firstname)
    const getActivity = reservation["activity"]

    tr.innerHTML =
        "<td>" + reservation["reservationID"] + "</td>" +
        "<td>" + getCustomer.firstname + " " + getCustomer.lastname + "</td>" +
        "<td>" + getCustomer.email + "</td>" +
        "<td>" + getActivity.name + "</td>" +
        "<td>" + reservation.date + "</td>" +
        "<td>" + getActivity.startTime + "</td>" +
        "<td>" + reservation.status + "</td>" +
        "<td>" +
        "<button class='confirmRes' id='confirmReservation" + index + "' value='" + reservation + "'>Godkend</button>" +
        "</td>" +
        "<td>"
        + "<button class='cancelRes' id='cancelReservation" + index + "' value='" + reservation + "'>Annuller</button>" +
        "</td>"

    tablebody.appendChild(tr);

    const confirmReservationBtn = document.getElementById("confirmReservation" + index);
    const cancelReservationBtn = document.getElementById("cancelReservation" + index);

    confirmReservationBtn.addEventListener('click', () => {

        const confirmed = confirm('Er du sikker at du vil godkende reservation ' + reservation["reservationID"] + '?');

        if (confirmed) {
            console.log("virker")
            confirmReservation(reservation)

        }

    });

    cancelReservationBtn.addEventListener('click', () => {

        const confirmed = confirm('Er du sikker at du vil annullere reservation ' + reservation["reservationID"] + '?');

        if (confirmed) {
            console.log("virker")
            cancelReservation(reservation)

        }

    });
}

async function cancelReservation(reservation) {

    console.log(reservation["reservationID"])
    const reservationId = reservation["reservationID"];

    let url = "http://localhost:8080/updateReservationStatus/CANCELLED/" + reservationId;

    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const fetchData = await fetch(url, putRequest)

    if (!fetchData.ok) {
        console.log("Det gik ikke godt med update");
    } else location.reload(); //reloader siden når reservation er cancelled
}

async function confirmReservation(reservation) {

    console.log(reservation["reservationID"])
    const reservationId = reservation["reservationID"];

    let url = "http://localhost:8080/updateReservationStatus/CONFIRMED/" + reservationId;

    const putRequest = {
        method: 'PUT',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const fetchData = await fetch(url, putRequest)

    if (!fetchData.ok) {
        console.log("Det gik ikke godt med update");
    } else location.reload(); //reloader siden når reservation er godkendt
}

function displayConfirmedReservations(reservation) {


    const ALlConfTableBody = document.getElementById("ALlConfTableBody")
    const trC = document.createElement("tr")
    const getCustomer = reservation.customer
    console.log(getCustomer.firstname)
    const getActivity = reservation["activity"]

    trC.innerHTML =
        "<td>" + reservation["reservationID"] + "</td>" +
        "<td>" + getCustomer.firstname + " " + getCustomer.lastname + "</td>" +
        "<td>" + getCustomer.email + "</td>" +
        "<td>" + getActivity.name + "</td>" +
        "<td>" + reservation.date + "</td>" +
        "<td>" + getActivity.startTime + "</td>" +
        "<td>" + reservation.status + "</td>" +
        "<td>"

    ALlConfTableBody.appendChild(trC);
}



