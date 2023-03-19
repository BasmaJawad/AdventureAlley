// Henter submit fra HTML
const btn = document.getElementById("submitButton")

btn.addEventListener("click",setup)

const UrlLogin = "http://localhost:8080/UserLogin"

let users = []
async function setup(){
   await actionFetchCustomers()
    UserLogin()
}



function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

async function actionFetchCustomers(){
    users = await fetchAny(UrlLogin);

}

users.forEach(user => {
    const userType = user.userType"usertype"; // Accessing the enumType property
    // Do something with the user data and userType
});

console.log(users)



function UserLogin(){

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    let user = users.find(user => user.username === username && user.password === password)

    let userType = users.usertype;

    if(user){
        console.log("User found")
        if (user.userTyper === "ADMIN") {
            window.location.href = "../templates/Admin.html"
        } else if (user.enumType === "EMPLOYEE") {
            window.location.href = "../templates/manager.html"
        }
        console.log("User not found")
    }

}


