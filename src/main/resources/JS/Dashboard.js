let reservationsThisMonth = [];
let reservationsToday = [];
let pendingReservations = [];
document.addEventListener('DOMContentLoaded', setup);


function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}
function setup() {
    fetchReservationsByMonth();
    fetchReservationsByDay();
    fetchPendingReservations();

}
window.addEventListener("load", displayKPIs);
async function fetchReservationsByMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const url =  "http://localhost:8080/reservationsByMonth/" + currentYear+ "/0" +currentMonth;

    reservationsThisMonth = await fetchAny(url)
    console.log(reservationsThisMonth.length)

}

async function fetchReservationsByDay(){
    const today = new Date().toISOString().split('T')[0]

    const getReservationsByDayUrl = "http://localhost:8080/reservation/" + today;
    reservationsToday = await fetchAny(getReservationsByDayUrl)
    console.log(reservationsToday.length)
}

async function fetchPendingReservations(){
    const url = "http://localhost:8080/reservationsByStatus/PENDING";
    pendingReservations = await fetchAny(url);
    console.log(pendingReservations.length)
}

function displayKPIs(){
    const totalReservationsThisMonth = document.getElementById("reservationerMåned");
    const trtmP = document.createElement("p")
    trtmP.textContent = reservationsThisMonth.length
    totalReservationsThisMonth.appendChild(trtmP)


    const totalReservationsToday = document.getElementById("reservationerDag");
    const trtdP = document.createElement("p")
    trtdP.textContent = reservationsToday.length
    totalReservationsToday.appendChild(trtdP)


    const totalPendingReservations = document.getElementById("afventerGodkendelse");
    const tprP = document.createElement("p")
    tprP.textContent = pendingReservations.length
    totalPendingReservations.appendChild(tprP)

}

