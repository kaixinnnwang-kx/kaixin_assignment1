let events = [
    {
        eventId:1,
        name: "Concert A",
        date: "2026-11-01",
        availableSeats: 4,
        price:10
    },
    {
        eventId:2,
        name: "Concert B",
        date: "2026-11-23",
        availableSeats: 10,
        price:8
    },
    {
        eventId:3,
        name: "Concert C",
        date: "2026-11-20",
        availableSeats: 8,
        price:15
    },
    {
        eventId:4,
        name: "Concert D",
        date: "2026-11-16",
        availableSeats: 2,
        price:7
    },
    {
        eventId:5,
        name: "Concert E",
        date: "2026-12-09",
        availableSeats: 15,
        price:10
    }
]


    // Retrieve upcoming events with available seats.
    function RetrieveEvents() {
        let availableEvents = [];
        let today = "2026-11-05";
        for(let i = 0; i<events.length; i++){
            if(events[i].date > today && events[i].availableSeats > 0){
                availableEvents.push(events[i]);
            }
        }
        return availableEvents;
        
    }
    console.log(RetrieveEvents("2026-11-05"));
    // Calculate total ticket price.
    function CalculatePrice(selectedEvents) {
        let totalPrice = 0;
        for(let i=0; i<selectedEvents.length; i++){
            for(let j=0; j<events.length; j++){
                if(events[j].eventId == selectedEvents[i].eventId){
                    let subtotal = events[j].price * selectedEvents[i].quantity
                    totalPrice = totalPrice + subtotal;
                }
            }
            }
       return totalPrice;
    }
        // Book tickets for an event.
    function BookTickets() {
        console.log("Hello function B");
    }
    // Cancel an existing booking.
    function CancelBookings() {
        console.log("Hello function B");
    }
    // Apply a promotional discount.
    function ApplyDiscount() {
        console.log("Hello function B");
    }

    //Retrieve all bookings made by a customer
    function RetrieveBookings() {
        console.log("Hello function B");
    }

