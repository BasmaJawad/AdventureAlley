const UrlActivitiTimes = "http://localhost:8080/availableTimes";
const timeDivWrapper = document.getElementById("AvailableTimes")

document.addEventListener('DOMContentLoaded', actionFetchTimes);

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

let activities = []

async function actionFetchTimes() {
    activities = await fetchAny(UrlActivitiTimes);
    activities.forEach(displayTimes)
}

function displayTimes(activities) {

    const timesDiv = document.createElement("div")

    timesDiv.textContent = activities.startTime

    //gør div til en knap, som har value activityTimes altså hele aktiviteten
    timesDiv.addEventListener('click', function () { selectTime(this, activities); console.log(activities) })

    timesDiv.classList.add("timeDiv")
    timesDiv.classList.add("selected")
    timeDivWrapper.appendChild(timesDiv)

}

function selectTime(element, activityTimes) {


    //henter alle divs med klassen timeDiv i en liste
    const timesDivs = document.getElementsByClassName("timeDiv")

    //fjerner klassen selectedTime fra alle divs
    for (let i = 0; i < timesDivs.length; i++) {
        timesDivs[i].classList.remove("selected")
    }
    //tildeler den valgte aktivitet den valgte klasse (så den kan få en farve og vi kan vælge dens value)
    element.classList.add("selected")

    //selectedTime er en hidden input i html, som nu får en hel aktivitet som value
    document.getElementById('selectedTime').value = activityTimes;
}