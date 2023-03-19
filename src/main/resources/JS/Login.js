document.querySelector("#login-link").
addEventListener("click", function()
{document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").
addEventListener("click", function()
{document.querySelector(".popup").classList.remove("active");
});


const btn = document.getElementById("submitButton")

btn.addEventListener("click",setup)

const UrlLogin = "http://localhost:8080/Login"

let customers = []
async function setup(){
    await actionFetchCustomers()
    compareUserInput()
}
console.log("hej 6")


function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}

async function actionFetchCustomers(){
    customers = await fetchAny(UrlLogin);

}


function compareUserInput(){

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    let customer = customers.find(customer => customer.email === email && customer.password === password)

    if(customer){
        console.log("User found")
        window.location.href = "../templates/homepage.html"
    } else {
        console.log("User not found")
    }

}

