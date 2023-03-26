let reservationsThisMonth = [];
let reservationsToday = [];
let pendingReservations = [];

window.addEventListener("load", setup);
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}
async function setup() {
    //promise.all is used to wait for all the promises to be resolved before continuing
    await Promise.all([
        fetchReservationsByMonth(),
        fetchReservationsByDay(),
        fetchPendingReservations(),
    ])
    displayKPIs()
    displayRevenueThisMonth()
    displayPopularActivity()
}

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
function displayRevenueThisMonth(){
    const revenueThisMonth = document.getElementById("revenue");
    revenueThisMonth.textContent = calculateTotalReservationsThisMonth() + " dkk"

    const thisMonth = document.getElementById("month");
    thisMonth.textContent = new Date().toLocaleString('default', { month: 'long'});

}

function calculateTotalReservationsThisMonth(){
    let totalReservationsThisMonth = 0;

    reservationsThisMonth.forEach(reservation => {
    if (reservation.status != "CANCELLED")
        totalReservationsThisMonth += reservation.price
    })
    return totalReservationsThisMonth;
}


function displayPopularActivity(){
    const popularActivity = document.getElementById("popActivityImg");
    const popularActivityName = findPopularActivity();

    if (popularActivityName == "Paintball"){
        popularActivity.src = "../static/images/img_7.png"
    }

}
function findPopularActivity(){

    //lasertag og gokart eksisterer ikke i databasen endnu
        const activityCount = {
            Paintball: 0,
            Lasertag: 0,
            GoKart: 0,
        }

        //looper gennem alle reservationer
        //hver gang den finder en reservation med samme aktivitet navn, tæller den op
        // [] bruges til at acessere et objekts properties
        reservationsThisMonth.forEach((reservation) => {
            activityCount[reservation.activity.name]++;
        });

        let mostPopActivity;

        let maxCount = 0;

        //for in loop
        for (const activity in activityCount) {
            if (activityCount[activity] > maxCount) { //hvis current activity er større end maxCount
                mostPopActivity = activity; //sæt mostPopActivity til at være current activity
                maxCount = activityCount[activity]; //sætter maxCount til at være current activity
            }
        }

        return mostPopActivity;
}
