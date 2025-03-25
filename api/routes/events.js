import prisma from "../prisma/client.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.events.findMany();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a specific event by ID
export const getEventsById = async (req, res) => {
  const eventId = parseInt(req.params.id);

  try {
    const event = await prisma.events.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

