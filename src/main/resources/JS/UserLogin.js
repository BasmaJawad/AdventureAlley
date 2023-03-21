// Henter submit fra HTML
const btn = document.getElementById("submitButton")

btn.addEventListener("click", setup)

const UrlLogin = "http://localhost:8080/UserLogin"

let users = []

async function setup() {
    await actionFetchCustomers()
    UserLogin()

}


function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

async function actionFetchCustomers() {
    users = await fetchAny(UrlLogin);

}

/*
users.forEach(user => {
    const userType = user["usertype"]; // Accessing the enumType property
    // Do something with the user data and userType
});

 */

console.log(users)

// Verficerer om brugeren er i databasen
// Hvis brugeren er i databasen, så bliver brugeren sendt videre til den rigtige side
function UserLogin() {

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    let user = users.find(user => user.username === username && user.password === password)

    let userType = user["usertype"];

    if (user) {
        console.log("User found")

        if (userType === "ADMIN") {
            window.location.href = "../templates/Admin.html"
            console.log("ADMIN")

        } else if (userType === "EMPLOYEE") {
            console.log("EMPLOYEE")
            window.location.href = "../templates/Employee.html"

        }
    } else
        console.log("User not found")

}

function showUser(){
    let u = localStorage.getItem("username")
    console.log(u)
    u = JSON.parse(u)
    if (u != undefined){
        const userName = document.getElementById("username")
        userName.textContent = u["username"]
    } else {
    console.log("ingen er logget ind")
    }
}


