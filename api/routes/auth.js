
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>  {
    const secure = process.env.SECURE == "true"
    const { email, password, name } = req.body;
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();
    const newUser = await prisma.users.create({
      data: { email, password: hashedPassword, username:name, updated_at:now },
      select: { id: true, email: true, username: true },
    });

    const payload = { userId: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
    res.cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 ,secure: secure});
    
    res.json(newUser);
  };
  
  export const login = async (req, res) => {
    const secure = process.env.SECURE == "true"
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
    res.cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000,secure: secure });
  
    // ensure that the password is not sent to the client
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  
    res.json(userData);
  };
  
  export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  };
  
  // requireAuth middleware will validate the access token sent by the client and will return the user information within req.auth
  export const getMe = async (req, res) => {
    const user = await prisma.users.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true },
    });
    res.json(user);
  };