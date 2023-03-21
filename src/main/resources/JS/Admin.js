document.querySelector("#u-Link").
addEventListener("click", function()
{document.querySelector(".popupUser").classList.add("active");

});

document.querySelector(".popupUser .close-btn").addEventListener("click", function()
{document.querySelector(".popupUser").classList.remove("active");
});

document.addEventListener('DOMContentLoaded', setup);

let createUserForm;
let users = JSON.parse(localStorage.getItem("users"));
window.onload = users.forEach(displayUser)
function setup(){
    createUserForm = document.getElementById("CreateUser");
    createUserForm.addEventListener("submit",submitData);

}
// Her submitter vi data
async function submitData(event) {

    // Sikre at den ikke bliver submittet allerede i html'en
    event.preventDefault();

    const form = event.currentTarget //returnere form
    const url = form.action; //henter form action (url'en)

    try {

        const formData = new FormData(form) //forbinder alle input med input-value fra brugeren

        await postFormData(url, formData)

        alert(formData.get('username') + ' er oprettet');
        //Vi skal sørger for at den redirekte til de rigtige landingpage, alt efter hvordan hvilke aktivitet man har valgt


    }
    catch (error) {
        alert(error.message)

    }
}

// Vi sørger for at poste data til DB
async function postFormData(url, formData) {

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



let editBtn;
let deleteBtn;
function displayUser(user){
    console.log("display User" + user.username)

    const table = document.getElementById("tableBody")
    const tableBody = document.createElement("tr")

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

    table.appendChild(tableBody)

}

function displayEditForm(user) {
    // Display a form with the current user's information
    const formContainer = document.getElementById("form-container");
    const form = document.createElement("form");

    form.innerHTML =
        "<label for='username'>Brugernavn:</label>" +
        "<input type='text' id='username' name='username' value='" +
        user.username +
        "'><br>" +
        "<label for='usertype'>Brugertype:</label>" +
        "<input type='text' id='usertype' name='usertype' value='" +
        user["usertype"] +
        "'><br>" +
        "<button type='submit'>Gem ændringer</button>";

    // Attach a submit event listener to the form
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Update the user's information in the table
        user.username = form.querySelector("#username").value;

        user["usertype"] = form.querySelector("#usertype").value;

        console.log("test " + user)

        updateTableRow(user);

        // Hide the form
        formContainer.innerHTML = "";
    });

    formContainer.innerHTML = "";
    formContainer.appendChild(form);
}

function updateTableRow(user) {
    console.log("test3" + user )
    const table = document.getElementById("tableBody");
    const tableRows = table.getElementsByTagName("tr");

    for (let i = 0; i < tableRows.length; i++) {
        const tableData = tableRows[i].getElementsByTagName("td");
        if (tableData[0].textContent === user.username) {
            tableData[1].textContent = user["usertype"];
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
    console.log("test34" + user.id)
    console.log(JSON.stringify(user))
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













