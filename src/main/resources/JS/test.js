
const customebtn = document.getElementById("customebtn");
customebtn.addEventListener("click", setup);

function setup(){
        const storedCustomer = localStorage.getItem("customer");
        //fra String til JSON
        const customer = JSON.parse(storedCustomer);
        console.log(customer)
}
