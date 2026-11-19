# EVENT TICKETING SYSTEM

The Node.js module allows users to manage ticket bookings in an event ticketing system. Users can view upcoming events, book tickets, enjoy bulk-purchase discounts, update or cancel existing bookings, retrieve their booking records, and join a waiting list for sold-out events.

# Functions
Function 1: RetrieveEvents()

Description: Retrieves a list of upcoming events based on the current date.

Parameters: None

Return: An array containing upcoming events, including their event ID, name, date, available seats and ticket price.

Function 2: ApplyDiscount(eventId, quantity)

Description: Calculates the total ticket price and applies a 10% discount when a customer purchases 3 or more tickets.

Parameters:

eventId – ID of the selected event.

quantity – Number of tickets purchased.

Return: The final ticket price after any applicable discount, or an error message.

Function 3: BookTickets(eventId, quantity, name)

Description: Allows customers to book tickets for an upcoming event. The function checks ticket availability, calculates the final price and reduces the available seats upon successful booking.

Parameters:

eventId – ID of the selected event.

quantity – Number of tickets to book.

name – Customer's name.

Return: A booking confirmation containing the booking ID, event details and total price, or an error message.

Function 4: UpdateBooking(bookingId, newQuantity)

Description: Allows customers to modify the number of tickets in an existing booking. The function updates the available seats and recalculates the total price.

Parameters:

bookingId – ID of the existing booking.

newQuantity – Updated number of tickets.

Return: A confirmation containing the updated quantity and price, or an error message.

Function 5: RetrieveBookings(name)

Description: Retrieves all active bookings associated with a customer's name.

Parameters:

name – Customer's name.

Return: An array of matching booking records. Returns an empty array if no bookings are found.

Function 6: CancelBookings(bookingId)

Description: Cancels an existing booking and restores the reserved seats to the event. Bookings for past events cannot be cancelled.

Parameters:

bookingId – ID of the booking to cancel.

Return: A cancellation confirmation or an error message.

Function 7: JoinWaitlist(eventId, name)

Description: Allows customers to join the waiting list for a sold-out event. The function prevents duplicate waiting-list entries.

Parameters:

eventId – ID of the selected event.

name – Customer's name.

Return: A waiting-list confirmation or an error message.







# References
https://ticketmaster.sg/
https://www.eventbrite.com/
