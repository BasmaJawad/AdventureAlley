// Gør så popup formen kan åbnes og lukkes, og kun bliver vist når kaldt
document.querySelector("#login-link").addEventListener("click", function () {
    document.querySelector(".popup").classList.add("active");
    document.querySelector(".overlay").classList.add("overlayBackground");
    console.log("hej 1")
});

document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
    document.querySelector(".overlay").classList.remove("overlayBackground");
    navbar()
});

let storedCustomer;
let customer;

const btn = document.getElementById("submitButton")

btn.addEventListener("click", setup)

const UrlLogin = "http://localhost:8080/Login"

let customers = []

async function setup() {
    await actionFetchCustomers()
    compareUserInput()
}

console.log("hej 6")


function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

async function actionFetchCustomers() {
    customers = await fetchAny(UrlLogin);

}


function compareUserInput() {


    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    customer = customers.find(customer => customer.email === email && customer.password === password)

    if (customer) {
        console.log("User found")
        //den her sætter customer i en local storage. Fungere som sessions. Den kan hentes i andre html sider
        storedCustomer = localStorage.setItem("customer", JSON.stringify(customer));

        // lukker popup vinduet


        // Denne funktion kommer fra js/reservation.js

        var currentUrl = window.location.href;
        console.log("nuværende side" + currentUrl)

        if (currentUrl.includes("http://localhost:63342/AdventureAlley/templates/hp.html#popup")) {
            window.location.href = "../templates/CustomerReservations.html"
            console.log("hej 2")
        } else {
            //window.location.href = "../templates/paintballLandingpage.html"
            document.querySelector(".popup").classList.remove("active")
            document.querySelector(".overlay").classList.remove("overlayBackground")
            showLoggedCustomer()
        }

        //document.querySelector(".nextReservation").classList.remove("active");

    } else {
        console.log("User not found")
    }

}

