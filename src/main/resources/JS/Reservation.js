const UrlActivitiTimes = "http://localhost:8080/activities";

const timeDivWrapper = document.getElementById("AvailableTimes")
const dateInput = document.getElementById("date")

dateInput.addEventListener("change", getReservationsByDate)
document.addEventListener('DOMContentLoaded', actionFetchTimes);

let activities = []
let reservations;
function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

async function actionFetchTimes() {
    activities = await fetchAny(UrlActivitiTimes);
    activities.forEach(displayTimes)
}

function selectTime(element, activityTimes) {


    //henter alle divs med klassen timeDiv i en liste
    const timesDivs = document.getElementsByClassName("timeDiv")

    //fjerner klassen selected fra alle divs i listen timesDivs
    for (let i = 0; i < timesDivs.length; i++) {
        timesDivs[i].classList.remove("selected")
    }
    //tildeler den valgte aktivitet den valgte klasse (så den kan få en farve og vi kan vælge dens value)
    element.classList.add("selected")

    //selectedTime er en hidden input i html, som nu får en hel aktivitet som value
    document.getElementById('selectedTime').value = activityTimes;
}


async function getReservationsByDate() {
    let getReservationsByDateUrl = "http://localhost:8080/reservation/";
    getReservationsByDateUrl = getReservationsByDateUrl + dateInput.value;

    reservations = await fetchAny(getReservationsByDateUrl)
    getAvailableActivityTimes()
}
function getAvailableActivityTimes(){

    //map laver ny array for hvert element i reservations, ved at parse det element i en function, som returnerer det ønskede output
    //så det fungere lidt som foreach(), bare hvor det sætter det i et array
    const reservedActivityIds = reservations.map(getReservedActivityIds) //ny liste med alle aktivitet id'er fra reservations

    //filter laver ny array med hvert element i activities, der ikke findes i reservedActivityIds. Filter() er en function, som returnerer true eller false
    const availabeActivityTimes = activities.filter(activities => !reservedActivityIds.includes(activities.id)) //ny liste med alle aktiviteter, som ikke er i reservations

    //for at slette de andre timeDivs i wrapperen, sætter vi innerHTML til tom
    timeDivWrapper.innerHTML = '';
    availabeActivityTimes.forEach(displayTimes)
}
function getReservedActivityIds(reservation) {
    return reservation["activity"].id
}
function displayTimes(activities) {

    const timesDiv = document.createElement("div")

    timesDiv.textContent = activities.startTime

    //gør div til en knap, som har value activityTimes altså hele aktiviteten
    timesDiv.addEventListener('click', function () {
        selectTime(this, activities); //this betyder at vi parse denne timesDiv
        console.log(activities)
    })

    timesDiv.classList.add("timeDiv")
    timesDiv.classList.add("selected")
    timeDivWrapper.appendChild(timesDiv)

}



