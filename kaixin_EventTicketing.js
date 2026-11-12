let events = [
    {
        eventId:1,
        name: "Concert A",
        date: "2026-11-01",
        earlyBirdDeadline: "2026-10-25",
        availableSeats: 4,
        price:10
    },
    {
        eventId:2,
        name: "Concert B",
        date: "2026-11-23",
        earlyBirdDeadline: "2026-11-16",
        availableSeats: 10,
        price:8
    },
    {
        eventId:3,
        name: "Concert C",
        date: "2026-11-20",
        earlyBirdDeadline: "2026-11-13",
        availableSeats: 8,
        price:15
    },
    {
        eventId:4,
        name: "Concert D",
        date: "2026-11-16",
        earlyBirdDeadline: "2026-11-09",
        availableSeats: 2,
        price:7
    },
    {
        eventId:5,
        name: "Concert E",
        date: "2026-12-09",
        earlyBirdDeadline: "2026-12-03",
        availableSeats: 15,
        price:10
    }
]
let bookings= [];
let nextBookingID = 1;


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
    function ApplyDiscount(totalPrice,bookingDate,earlyBirdDeadline) {
        if(bookingDate <=earlyBirdDeadline){
            let discount = totalPrice*0.10
            let finalPrice = totalPrice - discount
            return finalPrice;

        }else{
            return totalPrice;
        }
    }

    //Retrieve all bookings made by a customer
    function RetrieveBookings(name) {
        let bookingHistory = [];
        for(let i=0; i<bookings.length;i++){
            if(bookings[i].name == name){
                bookingHistory.push(bookings[i]);
            }
        }
         return bookingHistory;
    }

    console.log(CalculatePrice([
    { eventId: 1, quantity: 2 },
    { eventId: 2, quantity: 3 }
]));

// Test 1: Successful booking
console.log(BookTickets(1, 2, "Sara"));

// Test 2: Check remaining seats
console.log(events[0].availableSeats);

// Test 3: Check booking records
console.log(bookings);

// Test 4: Booking exceeds available seats
console.log(BookTickets(1, 5, "John"));

// Test 5: Invalid quantity
console.log(BookTickets(2, 0, "Mary"));

// Test 6: Event does not exist
console.log(BookTickets(99, 2, "Alex"));

console.log(CancelBookings(1));
console.log(bookings);
console.log(events[0].availableSeats);

// Test 1: Early bird discount applies
console.log(ApplyDiscount(100, "2026-11-10", "2026-11-16"));

// Test 2: Booking made on the deadline
console.log(ApplyDiscount(100, "2026-11-16", "2026-11-16"));

// Test 3: Booking made after the deadline
console.log(ApplyDiscount(100, "2026-11-20", "2026-11-16"));

// Create bookings first
console.log(BookTickets(1, 2, "Sara"));
console.log(BookTickets(2, 3, "Sara"));
console.log(BookTickets(3, 1, "John"));

// Retrieve Sara's bookings
console.log(RetrieveBookings("Sara"));

// Retrieve John's bookings
console.log(RetrieveBookings("John"));

// Retrieve a customer with no bookings
console.log(RetrieveBookings("Mary"));
module.exports = {
    RetrieveEvents,
    CalculatePrice,
    BookTickets,
    CancelBookings,
    ApplyDiscount,
    RetrieveBookings
};

