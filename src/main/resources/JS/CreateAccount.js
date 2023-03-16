// Add an event listener to the form submit button
const createAccountForm = document.getElementById("CreateAccount");

createAccountForm.addEventListener("submit",submitData);

function submitData(event) {

    // Sikre at den ikke bliver submittet allerede i html'en, så sidden ikke reloader
    event.preventDefault();

    /*
        // Get the form data
    const formData = new FormData(event.target);

    // Send an HTTP POST request to the backend
    fetch("http://localhost:8080/signup", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error(error);
        }
     */
}