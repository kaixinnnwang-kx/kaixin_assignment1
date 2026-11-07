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
let bookings= [];


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
    function BookTickets(eventId, quantity, name) {
        if (quantity <= 0) {
            return "Invalid ticket quantity!";
        }
        for(let i=0; i<events.length; i++){
            if(events[i].eventId == eventId){
                if(events[i].availableSeats >= quantity){
                    events[i].availableSeats = events[i].availableSeats - quantity
                      bookings.push({
                      bookingId: nextBookingID,
                      eventId: eventId,
                      quantity:quantity,
                      name:name
                    });
                     nextBookingID = nextBookingID + 1;
                     return "Booking is successful";
                }else{
                    return "Booking is unsuccesful"
                }
            }

        }
         return "Event not found!";
    }
    // Cancel an existing booking.
    function CancelBookings(bookingId) {
        let updatedBookings= [];
        for(let i=0; i<bookings.length;i++){
            if(bookings[i].bookingId == bookingId){
                for(let j=0; j<events.length;j++){
                    if (events[j].eventId == bookings[i].eventId){
                        events[j].availableSeats = events[j].availableSeats + bookings[i].quantity
                    }
                }
        for(let k=0;k<bookings.length;k++){
            if (bookings[k].bookingId!=bookingId){
                updatedBookings.push(bookings[k])
            }
            
        }
        bookings = updatedBookings;
        return "Booking is cancelled succesfully"
            }
        }
        return "Booking is not found"
      
    }
    // Apply a promotional discount.
    function ApplyDiscount() {
        console.log("Hello function B");
    }

    //Retrieve all bookings made by a customer
    function RetrieveBookings() {
        console.log("Hello function B");
    }

