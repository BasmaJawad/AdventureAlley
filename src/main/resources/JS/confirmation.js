const customer = JSON.parse(localStorage.getItem("customer"))
const activity = JSON.parse(localStorage.getItem("activity"))
const reservation = JSON.parse(localStorage.getItem("reservation"))
reservation.date = new Date(reservation.date) // convert date string to Date object

window.onload = setup

function setup() {
    console.log("setup")
    console.log(customer)
    console.log(activity)
    console.log(reservation) // Check the value of the reservation object
    const div = document.getElementById("confirmedReservationInfo")
    const divInfo = document.createElement("p")

    divInfo.innerHTML = "<br>" +"Navn: " + customer.firstname + " " + customer.lastname + "<br><br>"
        + "Booket aktivitet: " + activity.name + "<br><br>" +
        "Deltager: " + reservation.participants + "<br><br>" +
        " Dato: " + reservation.date + "<br><br>" +
        "Pris: " + reservation.price + " kr." +"<br><br>" +
        "Tid: " + activity.startTime + "<br> <br><br>" +
        "Du kan til enhver tid finde din reservation ved at logge ind på vores side."

    div.appendChild(divInfo)
    console.log(divInfo.innerHTML)
}