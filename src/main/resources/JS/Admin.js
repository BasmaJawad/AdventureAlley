
document.querySelector("#u-Link").
addEventListener("click", function()
{document.querySelector(".popupUser").classList.add("active");

});


document.querySelector(".popupUser .close-btn").addEventListener("click", function()
{document.querySelector(".popupUser").classList.remove("active");
});


window.onload = setup;

let createUserForm;
const table = document.getElementById("tableBody")

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

let users = []

async function actionFetchUsers() {
    const UrlLogin = "http://localhost:8080/UserLogin"
    users = await fetchAny(UrlLogin);
    table.innerHTML = "";
    users.forEach(displayUser);
}

function setup(){
    createUserForm = document.getElementById("CreateUser");
    createUserForm.addEventListener("submit",submitData);
    actionFetchUsers();
}
// Her submitter vi data
async function submitData(event) {

    // Sikre at den ikke bliver submittet allerede i html'en
    event.preventDefault();

    const form = event.currentTarget //returnere form
    const url = form.action; //henter form action (url'en)

    try {

        const formData = new FormData(form) //forbinder alle input med input-value fra brugeren

        await postNewUser(url, formData)

        alert(formData.get('username') + ' er oprettet');

        document.querySelector(".popupUser").classList.remove("active")
        actionFetchUsers()

    }
    catch (error) {
        alert(error.message)

    }
}

// Vi sørger for at poste data til DB
async function postNewUser(url, formData) {

    const newUser = Object.fromEntries(formData.entries()) //opdeler formData's elementer til objekter
    //newUserStored = localStorage.setItem("username", JSON.stringify(newUser)); //sætter newCustomer i local storage


    const formUserDataJsonString = JSON.stringify(newUser) //konvertere newCustomer objekter til Json Strings

    const postToDB = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formUserDataJsonString
    }

// Henter data, og hvis den ikke er "ok", ,generes der en error message
    const fetchData = await fetch(url, postToDB)

    if(!fetchData.ok){
        console.log("virker ikke")
    }

    return fetchData.json();

}


function displayUser(user){

    console.log("display User" + user.username)


    const tableBody = document.createElement("tr")

    //setAttribute sætter attributter på html elementer
    tableBody.setAttribute("data-userid", user.id);

    tableBody.innerHTML =
        "<td>" + user.username + "</td>" +
        "<td>" +  user["usertype"] +"</td>"+
        "<td>" +
            "<button class='edit-btn' >Rediger</button>" +
            "<button class='delete-btn' >Slet</button>" +
        "</td>"


    const editBtn = tableBody.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        displayEditForm(user);

    });

    const deleteBtn = tableBody.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        const confirmed = confirm("Er du sikker på at du vil slette " + user.username + "?")
        if (confirmed) {
            restDeleteUser(user);
        }
    });

    table.appendChild(tableBody)

}

function displayEditForm(user) {
    // Viser formen med den valgte brugers information
    const formContainer = document.getElementById("form-container");
    const form = document.createElement("form");

    form.innerHTML =
        "<label for='username'>Brugernavn:</label>" +
        "<input type='text' id='username' name='username' value='" +
        user.username +
        "'><br>" +
        "<label for='usertype'>Brugertype:</label>" +
        "<select id='usertype' name='usertype'>" +
        "<option value='ADMIN'" + (user["usertype"] === "ADMIN" ? " selected" : "") + ">ADMIN</option>" + //hvis brugertype er admin, så sæt selected
        "<option value='EMPLOYEE'" + (user["usertype"] === "EMPLOYEE" ? " selected" : "") + ">EMPLOYEE</option>" +
        "</select><br>" +
        "<button type ='submit' id = 'submitFormB' >Gem ændringer</button>" +
        "<button class='close-btn'>Annuller</button>";

    // Viser form
    formContainer.style.display = "block";

    // Tilføjer 'submit' en event
    form.addEventListener("submit", (event) => {
        event.preventDefault();

   // Opdaterer brugerens info på tabellen
        user.username = form.querySelector("#username").value;

        user["usertype"] = form.querySelector("#usertype").value;

        console.log("test " + user)

        updateTableRow(user);

    // Skjuler form
    formContainer.style.display = "none";
});

    // Lukker formen når man trykker op close (click event)
    const closeBtn = form.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {

    //Skjuler formen uden at lave ændringer
    formContainer.style.display = "none";
    });

    formContainer.innerHTML = "";
    formContainer.appendChild(form);
}

function updateTableRow(user) {
    const table = document.getElementById("tableBody");
    const tableRows = table.getElementsByTagName("tr"); //ale <tr> elementer i <table>

    //opdater tabel på siden med det samme (kun usertype virker pt)

    //loop over alle <tr> elementer i <table>
    for (let i = 0; i < tableRows.length; i++) {
        const tableData = tableRows[i].getElementsByTagName("td"); //henter alle <td> (celler) elementer i <tr>
        if (tableData[0].textContent === user.username) { //hvis navn i <td> er lig med navn i user objekt
            tableData[1].textContent = user["usertype"]; //opdater usertype
            break;
        }
    }

    updateUser(user);

}

// Kalder på restUpdate og giver
async function updateUser(user){
    const response = await restUpdateUser(user)
    console.log(response)
}

// Skal opdatere brugen til databasen

async function restUpdateUser(user){

    const url = "http://localhost:8080/user/" + user.id


    const fetchOptions ={
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: ""

    }

    const userAsString = JSON.stringify(user)

    fetchOptions.body = userAsString

    const response = await fetch(url, fetchOptions)

    if (!response.ok){
        console.log("failed to update")
    }
    return response
}

async function restDeleteUser(user) {

    const url = "http://localhost:8080/deleteUser/" + user.id
    //opdater tabel på siden med det samme

    const deleteUser ={
        method: "DELETE",
        headers: {"content-type": "application/json"},
        body: ""
    }
    const userAsString = JSON.stringify(user)
    deleteUser.body = userAsString

    const response = await fetch(url, deleteUser)

    if (!response.ok){
        console.log("failed to delete")

    }
    else {
        const table = document.getElementById("tableBody");
        //finder den <tr> med data-userid attribute der har value = user id. (Acesser setAttribute)
            const row = table.querySelector(`tr[data-userid="${user.id}"]`);
        table.removeChild(row);
    }

    return response

}

const logoutBtn = document.getElementById("logoutBtn")
logoutBtn.addEventListener("click", () => {
    logout()
})

function logout(){
localStorage.removeItem("users")
}













