//Stærkt inspireret fra nettet

const pendingTable = document.getElementById('tableBody');
const confirmedTable = document.getElementById('ALlConfTableBody');
const cancelledTable = document.getElementById('ALlCancelTableBody');

const searchQuery = document.getElementById('searchQuery');

// Function for searching reservations by status
async function searchReservationsByStatus(status) {
    const url = `http://localhost:8080/reservationsByStatus/${status}`;
    const reservations = await fetchAny(url);
    return reservations.filter(reservation => reservation.status === status);
}

// Function for searching reservations by name
async function searchReservationsByName(name) {
    const pendingReservations = await searchReservationsByStatus('PENDING');
    const confirmedReservations = await searchReservationsByStatus('CONFIRMED');
    const cancelledReservations = await searchReservationsByStatus('CANCELLED');

    const allReservations = pendingReservations.concat(confirmedReservations, cancelledReservations);
    return allReservations.filter(reservation => reservation.customer.firstname.toLowerCase().includes(name.toLowerCase()));
}

// Function for updating tables with search results
function updateTables(reservations) {
    // clear table rows
    pendingTable.innerHTML = '';
    confirmedTable.innerHTML = '';
    cancelledTable.innerHTML = '';

    reservations.forEach(async (reservation) => {
        const getCustomer = reservation.customer
        const getActivity = reservation["activity"]


        const row = `<tr>
                  <td>${reservation["reservationID"]}</td>
                  <td>${getCustomer.firstname} ${getCustomer.lastname}</td>
                  <td>${getCustomer.email}</td>
                  <td>${getActivity.name}</td>
                  <td>${reservation.date}</td>
                  <td>${getActivity.startTime}</td>
                  <td>${reservation.status}</td>
                </tr>`;
        switch(reservation.status) {
            case 'PENDING':
                pendingTable.innerHTML += row;
                break;
            case 'CONFIRMED':
                confirmedTable.innerHTML += row;
                break;
            case 'CANCELLED':
                cancelledTable.innerHTML += row;
                break;
            default:
                console.log('Invalid status');
        }
    });
}

// Live search function
async function liveSearchReservations() {
    const query = searchQuery.value.trim();
    if (query === '') {
        // if the search query is empty, clear the tables and return
        pendingTable.innerHTML = '';
        confirmedTable.innerHTML = '';
        cancelledTable.innerHTML = '';
        return;
    }

    let searchResults;
    if (['PENDING', 'CONFIRMED', 'CANCELLED'].includes(query.toUpperCase())) {
        searchResults = await searchReservationsByStatus(query.toUpperCase());
    } else {
        searchResults = await searchReservationsByName(query);
    }

    updateTables(searchResults);
}

// Add event listener to searchQuery input
searchQuery.addEventListener('input', function() {
    if (searchQuery.value.trim() === '') {
        location.reload();
    } else {
        liveSearchReservations();
    }
});