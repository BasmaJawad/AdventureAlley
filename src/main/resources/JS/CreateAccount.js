
document.addEventListener('DOMContentLoaded', setup);

let createAccountForm;
function setup(){
    createAccountForm = document.getElementById("CreateAccount");
    createAccountForm.addEventListener("submit",submitData);
}

// Her submitter vi data
async function submitData(event) {

    // Sikre at den ikke bliver submittet allerede i html'en, så sidden ikke reloader
    event.preventDefault();

    const form = event.currentTarget //returnere form
    const url = form.action; //henter form action (url'en)

    try {

        const formData = new FormData(form) //forbinder alle input med input-value fra brugeren

        await postFormData(url, formData)

        alert(formData.get('firstname') + ' ' + formData.get('lastname') + ' er oprettet');

    }
    catch (error) {
    alert(error.message)

}
}
// Vi sørger for at poste data til DB
async function postFormData(url, formData) {

    const plainFormData = Object.fromEntries(formData.entries()) //opdeler formData's elementer til objekter

    const formDataJsonString = JSON.stringify(plainFormData) //konvertere plainFormData objekter til Json Strings

    const postToDB = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formDataJsonString
    }
// Henter dataen, og hvis den ikke er "ok", ,generes der en error message
    const fetchData = await fetch(url, postToDB)

    if(!fetchData.ok){
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }

    return fetchData.json();

}