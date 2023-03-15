// Add an event listener to the form submit button
const createAccountForm = document.getElementById("CreateAccount");

createAccountForm.addEventListener("submit",submitData);

function submitData(event) {

    // Sikre at den ikke bliver submittet allerede i html'en, så sidden ikke reloader
    event.preventDefault();
}