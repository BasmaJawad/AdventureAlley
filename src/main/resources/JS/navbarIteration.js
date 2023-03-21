const navbarWrapper = document.getElementById('navbarWrapper');

function navbar() {
    const customer = JSON.parse(localStorage.getItem("customer"))

    console.log("customer i navbar js" + customer)

        if (customer!=null){
            navbarWrapper.innerHTML =
                "<li><a href='hp.html'>HJEM</a></li>" +
            "<li><a href='#'>BOOKING</a></li>" +
            "<li><a href='CustomerReservations.html'>MINE RESERVATIONER</a></li>" +
            "<li><a id='logout' href='#'>LOG UD</a></li>"
        }

        else {
            navbarWrapper.innerHTML =
                "<li><a href='hp.html'>HJEM</a></li>" +
                "<li><a href='#'>BOOKING</a></li>" +
                "<li><a href='#popup' id='login-link'>LOG IND</a></li>"
        }
}


