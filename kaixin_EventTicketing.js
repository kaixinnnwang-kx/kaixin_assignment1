let events = [
    {
        eventId: 1, 
        name: "Concert A", 
        date: "2026-11-01", 
        availableSeats: 4,
        price: 40
    },
    {
        eventId: 2, 
        name: "Concert B", 
        date: "2026-12-23", 
        availableSeats: 10, 
        price: 60
    },
    {
        eventId: 3, 
        name: "Concert C", 
        date: "2026-12-20", 
        availableSeats: 8, 
        price: 55
    },
    {
        eventId: 4, 
        name: "Concert D", 
        date: "2026-12-16", 
        availableSeats: 2, 
        price: 80
    },
    {
        eventId: 5, 
        name: "Concert E", 
        date: "2027-01-09", 
        availableSeats: 15, 
        price: 100
    }
];

let bookings = [];
let waitlist = [];
let nextBookingID = 1;

let ticketbook = {

    // Function 1: Retrieve upcoming events
    RetrieveEvents() {

        let availableEvents = [];
        let today = new Date();

        for (let i = 0; i < events.length; i++) {

            if (new Date(events[i].date) >= today) {
                availableEvents.push(events[i]);
            }
        }

        return availableEvents;
    },


    // Function 2: Apply discount
    ApplyDiscount(eventId, quantity) {

        if (eventId <= 0) {
            return "Invalid event ID!";
        }

        if (quantity <= 0) {
            return "Invalid ticket quantity!";
        }

        for (let i = 0; i < events.length; i++) {

            if (events[i].eventId == eventId) {

                let totalPrice = events[i].price * quantity;

                if (quantity >= 3) {
                    let discount = totalPrice * 0.10;
                    return totalPrice - discount;
                } else {
                    return totalPrice;
                }
            }
        }

        return "Event not found!";
    },


    // Function 3: Book tickets
    BookTickets(eventId, quantity, name) {

        if (eventId <= 0) {
            return "Invalid event ID!";
        }

        if (quantity <= 0) {
            return "Invalid ticket quantity!";
        }

        if (name == "") {
            return "Customer name cannot be empty!";
        }

        let today = new Date();

        for (let i = 0; i < events.length; i++) {

            if (events[i].eventId == eventId) {

                if (new Date(events[i].date) < today) {
                    return "Booking unsuccessful! Event has ended.";
                }

                if (events[i].availableSeats >= quantity) {

                    let finalPrice = this.ApplyDiscount(eventId, quantity);

                    events[i].availableSeats -= quantity;

                    bookings.push({
                        bookingId: nextBookingID,
                        eventId: eventId,
                        eventName: events[i].name,
                        quantity: quantity,
                        name: name,
                        totalPrice: finalPrice
                    });

                    let bookingNumber = nextBookingID;
                    nextBookingID++;

                    return "Booking #" + bookingNumber +
                        " confirmed for " + name +
                        "! " + quantity + " ticket(s) for " +
                        events[i].name +
                        ". Total: $" + finalPrice.toFixed(2);

                } else {
                    return "Booking unsuccessful! Not enough seats available.";
                }
            }
        }

        return "Event not found!";
    },


    // Function 4: Update booking
    UpdateBooking(bookingId, newQuantity) {

        if (bookingId <= 0) {
            return "Invalid booking ID!";
        }

        if (newQuantity <= 0) {
            return "Invalid ticket quantity!";
        }

        let today = new Date();

        for (let i = 0; i < bookings.length; i++) {

            if (bookings[i].bookingId == bookingId) {

                for (let j = 0; j < events.length; j++) {

                    if (events[j].eventId == bookings[i].eventId) {

                        if (new Date(events[j].date) < today) {
                            return "Cannot update a booking for a past event!";
                        }

                        let difference = newQuantity - bookings[i].quantity;

                        if (difference <= events[j].availableSeats) {

                            events[j].availableSeats -= difference;

                            bookings[i].quantity = newQuantity;

                            bookings[i].totalPrice =
                                this.ApplyDiscount(events[j].eventId, newQuantity);

                            return "Booking updated successfully! New quantity: " +
                                newQuantity + ". New total price: $" +
                                bookings[i].totalPrice.toFixed(2);

                        } else {
                            return "Not enough tickets available!";
                        }
                    }
                }
            }
        }

        return "Booking not found!";
    },


    // Function 5: Cancel booking
    CancelBookings(bookingId) {

        if (bookingId <= 0) {
            return "Invalid booking ID!";
        }

        let updatedBookings = [];
        let today = new Date();

        for (let i = 0; i < bookings.length; i++) {

            if (bookings[i].bookingId == bookingId) {

                let eventId = bookings[i].eventId;
                let cancelledQuantity = bookings[i].quantity;
                let eventName = bookings[i].eventName;

                for (let j = 0; j < events.length; j++) {

                    if (events[j].eventId == eventId) {

                        if (new Date(events[j].date) < today) {
                            return "Cannot cancel a booking for a past event!";
                        }

                        events[j].availableSeats += cancelledQuantity;
                    }
                }

                for (let k = 0; k < bookings.length; k++) {

                    if (bookings[k].bookingId != bookingId) {
                        updatedBookings.push(bookings[k]);
                    }
                }

                bookings = updatedBookings;

                return "Booking cancelled successfully! " +
                    cancelledQuantity + " seat(s) restored for " +
                    eventName;
            }
        }

        return "Booking not found!";
    },


    // Function 6: Retrieve customer bookings
    RetrieveBookings(name) {

        if (name == "") {
            return "Customer name cannot be empty!";
        }

        let bookingHistory = [];

        for (let i = 0; i < bookings.length; i++) {

            if (bookings[i].name == name) {
                bookingHistory.push(bookings[i]);
            }
        }

        return bookingHistory;
    },


    // Function 7: Join waiting list
    JoinWaitlist(eventId, name) {

        if (eventId <= 0) {
            return "Invalid event ID!";
        }

        if (name == "") {
            return "Customer name cannot be empty!";
        }

        let today = new Date();

        for (let i = 0; i < events.length; i++) {

            if (events[i].eventId == eventId) {

                if (new Date(events[i].date) < today) {
                    return "Cannot join waiting list for past events!";
                }

                if (events[i].availableSeats > 0) {
                    return "Tickets are still available!";
                }

                for (let j = 0; j < waitlist.length; j++) {

                    if (waitlist[j].eventId == eventId &&
                        waitlist[j].name == name) {

                        return "Customer is already on the waiting list!";
                    }
                }

                waitlist.push({
                    eventId: eventId,
                    name: name
                });

                return name +
                    " successfully joined the waiting list for " +
                    events[i].name + "!";
            }
        }

        return "Event not found!";
    }

};

module.exports = ticketbook;




