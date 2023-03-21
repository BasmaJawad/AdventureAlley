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
            "<button id ='edit-btn-${rowIndex}' class='edit-btn' >Rediger</button>" +
            "<button class='delete-btn'>Slet</button>" +
        "</td>"

    table.appendChild(tableBody)


}
const editButton = document.querySelectorAll('.edit-btn');
editButton.forEach((button) => {
    button.addEventListener('click', () => {
        const currentRow = button.parentNode.parentNode;
        // TODO: implement editing logic
    });
});



//UPDATE OG DELETE

//henter knapperne i en metode som skal blive læst EFTER at buttons er created i displayUSer

function getBtns(){
    editBtn= document.querySelector(".edit-btn")
    deleteBtn = document.querySelector(".delete-btn")
}


editBtn.addEventListener("click", updateUser)

async function updateUser(user){
    const response = await restUpdateUser(user)
    console.log(response)
}

async function restUpdateUser(user){
    const url = "http://localhost:8080/user"
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





function displayUser2(user){
    getBtns()

    const table = document.getElementById("tableBody")
    table.innerHTML.t = " "
    const tableBody = document.createElement("tr")

    tableBody.innerHTML =
        "<td>" + "<input value='" + user.username + "'/>" + "</td>" +
        "<td>" + "<input value='" + user["usertype"] + "'/>" + "</td>" +
        "<td>" +
        "<button class='edit-btn'>Rediger</button>" +
        "<button class='delete-btn'>Slet</button>" +
        "</td>"



    table.appendChild(tableBody)



    const editBtn = tableBody.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => updateUser(user));

    const deleteBtn = tableBody.querySelector(".delete-btn");
    //deleteBtn.addEventListener("click", () => deleteUser(user));
}








