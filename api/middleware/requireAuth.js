import jwt from "jsonwebtoken";
// Middleware to verify JWT token sent by the client
export function requireAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
  
      // attaching the user id to the request object, this will make it available in the endpoints that use this middleware
      req.userId = payload.userId;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }