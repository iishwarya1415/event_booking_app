import prisma from "../prisma/client.js";
export const createBooking = async (req, res) => {
    const { event_id, tickets_count } = req.body;
    const userId = req.userId;
  
    // Check if the event exists and if there are enough available tickets
    const event = await prisma.events.findUnique({
      where: { id: event_id },
    });
  
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
  
    if (event.tickets_available < tickets_count) {
      return res.status(400).json({ error: "Not enough tickets available" });
    }
  
    // Create the booking
    const booking = await prisma.bookings.create({
      data: {
        user_id: userId,
        event_id,
        tickets_count,
        booking_date: new Date(),
        updated_at: new Date(),
      },
    });
  
    // Update the available tickets
    await prisma.events.update({
      where: { id: event_id },
      data: { tickets_available: event.tickets_available - tickets_count },
    });
  
    res.json(booking);
  };

  export const getAllBookings = async (req, res) => {
    const userId = req.userId;
  
    // Get all bookings for the authenticated user
    const bookings = await prisma.bookings.findMany({
      where: { user_id: userId },
      include: {
        events: true, // Include event details for each booking
      },
    });
  
    res.json(bookings);
  };

  export const getBookingById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
  
    // Get booking details for the authenticated user
    const booking = await prisma.bookings.findFirst({
      where: {
        id: parseInt(id),
        user_id: userId,
      },
      include: {
        events: true, // Include event details for the booking
      },
    });
  
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
  
    res.json(booking);
  };
  export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { tickets_count } = req.body;
    const userId = req.userId;
  
    // Find the booking to update
    const booking = await prisma.bookings.findFirst({
      where: {
        id: parseInt(id),
        user_id: userId,
      },
    });
  
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
  
    // Find the event associated with the booking
    const event = await prisma.events.findUnique({
      where: { id: booking.event_id },
    });
  
    // If the booking is being updated, ensure tickets are available
    if (event.tickets_available + booking.tickets_count < tickets_count) {
      return res.status(400).json({ error: "Not enough tickets available" });
    }
  console.log (event.tickets_available)
  console.log (booking.tickets_count)
  console.log (typeof tickets_count)

    // Update the booking
    const updatedBooking = await prisma.bookings.update({
      where: { id: parseInt(id) },
      data: { tickets_count },
    });
    
    // tickets_available = 
    // Update the event's available tickets
    await prisma.events.update({
      where: { id: event.id },
      data: { tickets_available: event.tickets_available + booking.tickets_count - tickets_count },
    });
  
    res.json(updatedBooking);
  };
  export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
  
    // Find the booking to delete
    const booking = await prisma.bookings.findFirst({
      where: {
        id: parseInt(id),
        user_id: userId,
      },
    });
  
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
  
    // Find the event associated with the booking
    const event = await prisma.events.findUnique({
      where: { id: booking.event_id },
    });
  
    // Cancel the booking
    await prisma.bookings.delete({
      where: { id: parseInt(id) },
    });
  
    // Restore the event's available tickets
    await prisma.events.update({
      where: { id: event.id },
      data: { tickets_available: event.tickets_available + booking.tickets_count },
    });
  
    res.json({ message: "Booking cancelled successfully" });
  };
      