// Henter submit fra HTML
const btn = document.getElementById("submitButton")

btn.addEventListener("click", setup)

const UrlLogin = "http://localhost:8080/UserLogin"

let users = []

async function setup() {
    await actionFetchUsers()
    UserLogin()

}


function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

async function actionFetchUsers() {
    users = await fetchAny(UrlLogin);
    localStorage.setItem("users", JSON.stringify(users));
}



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
        alert("Forkert brugernavn eller adgangskode")

}
///// Create user



