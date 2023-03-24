//function der skal køres når html loader, (venter ikke på css, js osv)
document.addEventListener('DOMContentLoaded', actionFetchTimes);
let totalPrice = 0;

const reservationButton = document.querySelector(".nextReservation2")

function setup() {

    document.querySelector(".nextReservation").classList.add("active");
    document.querySelector(".nextReservation2").classList.remove("active");
    showLoggedCustomer()


}

// Remove the customer data from local storage after 1 hours
setTimeout(function () {
    removeCustomer()
}, 60 * 60 * 1000); // 1 hour in milliseconds

//når siden loader skal denne funktion kaldes
window.addEventListener("load", setup);

//for at hente alle activities
const UrlActivitiTimes = "http://localhost:8080/activities";
//Henter Tom div hvor alle tiderne skal vises
const timeDivWrapper = document.getElementById("insideAvailableTimes")
//henter input hvor dato skal indtastes
const dateInput = document.getElementById("date")
const participants = document.getElementById("participants")


//finder dagens dato og sætter den som minimum i input
const today = new Date().toISOString().split('T')[0];
dateInput.min = today

//funktion der viser alle ledige tider for den valgte dato
dateInput.addEventListener("change", getReservationsByDate)
participants.addEventListener("keyup", calculatePrice)

let activities = []
let reservations = []

async function actionFetchTimes() {
    activities = await fetchAny(UrlActivitiTimes);
    activities.forEach(displayTimes)
}

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

function displayTimes(activity) {

    calculatePrice()

    const timesDiv = document.createElement("div")

    timesDiv.textContent = activity.startTime
    console.log(activity.startTime)


    //gør div til en knap, som har value activityTimes altså hele aktiviteten
    timesDiv.addEventListener('click', function () {
        selectTime(this, activity); //this betyder at vi parse denne timesDiv
    })

    timesDiv.classList.add("timeDiv")
    timesDiv.classList.add("selected")
    timeDivWrapper.appendChild(timesDiv)


}

let chosenActivity;

function selectTime(element, activityTimes) {
    //selectedTime er en hidden input i html, som nu får en hel aktivitet som value
    //VIRKER IKKE
    // document.getElementById("selectedTime").value = activityTimes;

    chosenActivity = activityTimes;

    console.log(chosenActivity)

    //henter alle divs med klassen timeDiv i en liste
    const timesDivs = document.getElementsByClassName("timeDiv")

    //fjerner klassen selected fra alle divs i listen timesDivs
    for (let i = 0; i < timesDivs.length; i++) {
        timesDivs[i].classList.remove("selected")
    }
    //tildeler den valgte aktivitet den valgte klasse (så den kan få en farve og vi kan vælge dens value)
    element.classList.add("selected")


}


async function getReservationsByDate() {
    let getReservationsByDateUrl = "http://localhost:8080/reservation/";
    getReservationsByDateUrl = getReservationsByDateUrl + dateInput.value;

    reservations = await fetchAny(getReservationsByDateUrl)
    getAvailableActivityTimes()

    console.log(reservations)
}

function getAvailableActivityTimes() {

    //map laver ny array for hvert element i reservations, ved at parse det element i en function, som returnerer det ønskede output
    //så det fungere lidt som foreach(), bare hvor det sætter det i et array
    const reservedActivityIds = reservations.map(getReservedActivityIds) //ny liste med alle aktivitet id'er fra reservations
    console.log("her er alle reserverede " + reservedActivityIds)
    console.log(typeof reservedActivityIds)
    //filter laver ny array med hvert element i activities, der ikke findes i reservedActivityIds. Filter() er en function, som returnerer true eller false
    const availabeActivityTimes = activities.filter(activities => !reservedActivityIds.includes(activities.id)) //ny liste med alle aktiviteter, som ikke er i reservations

    console.log("her er alle ledie " + availabeActivityTimes)
    //for at slette de andre timeDivs i wrapperen, sætter vi innerHTML til tom
    timeDivWrapper.innerHTML = '';
    availabeActivityTimes.forEach(displayTimes)
}

function getReservedActivityIds(reservation) {
    return reservation["activity"].id
}


async function showLoggedCustomer() {

    let c = localStorage.getItem("customer")
    c = JSON.parse(c)
    if (c != undefined) {
        const customerName = document.getElementById("customerName")
        customerName.textContent = c["firstname"] + " " + c["lastname"]

        document.querySelector(".nextReservation").classList.remove("active");
        document.querySelector(".nextReservation2").classList.add("active");
        await reservationButton.addEventListener("click", postReservation)

    } else {

        console.log("ingen logget ind")
    }
}


function calculatePrice() {
    const price = 350;
    let participants = document.getElementById("participants").value
    totalPrice = price * participants

    const priceDiv = document.getElementById("priceTotal")
    priceDiv.innerHTML = "Pris: <br>" +
    "<input type='text' id='pris' name='priceTotal' " +
        "class='resInput' value ='"+ totalPrice + " 'kr. readonly>"

}

async function postReservation(event) {

    event.preventDefault()

    calculatePrice()

    const postReservationUrl = "http://localhost:8080/paintballBooking";
    const customer = JSON.parse(localStorage.getItem("customer"))

    if (checkValue()) {


        let reservation = {
            "price": totalPrice,
            "participants": participants.value,
            "date": dateInput.value,
            "activity": chosenActivity,
            "customer": customer
        }

        console.log(reservation)
        reservation = JSON.stringify(reservation)


        const postToDB = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: reservation
        }



        const fetchData = await fetch(postReservationUrl, postToDB)

        if (!fetchData.ok) {
            console.log("Det gik ikke godt med poste reservation");
        } else {
            localStorage.setItem("reservation", reservation)
            localStorage.setItem("activity", JSON.stringify(chosenActivity))
            window.location.href = "confirmation.html"
        }

        return fetchData.json();
    }

}


const logoutButton = document.getElementById("logout")
logoutButton.addEventListener("click", removeCustomer)

function removeCustomer() {
    console.log("logget ud")
    localStorage.removeItem('customer');
}

function checkValue() {
    if (participants.value > 20 || participants.value < 10) {
        alert("Du skal mellem 10-20 personer")
        return false;
    }
    if (dateInput.value == ""){
        alert("Du skal vælge en dato")
        return false;
    }
    return true;
}


