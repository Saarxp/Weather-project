import { NextFunction, Request, Response } from "express";
import User, { UserModel } from "../model/User";
import { matchedData } from "express-validator";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function getUsers(req: Request, res: Response) {
  const users = await UserModel.find(req.body.id);
  res.send(users);
}

export async function getMyUser(req: Request, res: Response) {
  const userId = decodedingToken(req, res);
  const userDetails = await UserModel.findById(userId);

  return res.status(200).send({ userDetails });
}

export async function addUser(req: Request, res: Response) {
  const { email, password, firstName, lastName, loggedIn }: User = req.body;
  const emailAvailabllity = await UserModel.findOne({ email });

  if (emailAvailabllity !== null) {
    return res.status(403).send({error: "Email already in use"});
  }

  const hashedPassword = await hashPssword(password);

  const newUser = new UserModel({ email, hashedPassword, firstName, lastName, loggedIn});

  await newUser.save();
  return res.status(200).send({ newUser });
}

function generateToken(userId: string) {
  const secretJsonKey = process.env.ACCESS_SECRET_TOKEN as Secret;

  if (!secretJsonKey) throw new Error("Secret key not found");
  return jwt.sign({ userId }, secretJsonKey);
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  const { email, password }: User = req.body;
  const userId = await validUserDetails(email, password);

  if (!userId) {
    return res.status(400).json({ error: "invalid email or password" });
  }
  await UserModel.updateMany({ loggedIn: true }, { loggedIn: false });

  await UserModel.findByIdAndUpdate(userId, { loggedIn: true });

  const token = generateToken(userId);
  res.json({ token });
}

export async function logoutUser(req: Request, res: Response) {
  const userId = decodedingToken(req, res);
  UserModel.updateOne(userId, { loggedIn: false });

  return res.status(200).send({ message: "Logged out successfully" });
}

export async function updateUser(req: any, res: Response) {
  const userId = decodedingToken(req, res);
  const payload = matchedData(req);

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if ("email" in payload) {
    user.email = payload.email;
  }
  if ("password" in payload) {
    user.hashedPassword = payload.password;
  }
  if ("firstName" in payload) {
    user.firstName = payload.firstName;
  }
  if ("lastName" in payload) {
    user.lastName = payload.lastName;
  }

  await user.save();

  res.status(200).send({ user });
}

export async function deleteUser(req: any, res: Response) {
  const userId = decodedingToken(req, res);
  console.log(userId);

  const result = await UserModel.findByIdAndDelete(userId);

  res.send({ result });
}

export async function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const secretJsonKey = process.env.ACCESS_SECRET_TOKEN as Secret;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).send("No token has been found");

  if (!secretJsonKey) {
    return res.status(500).send("Internal server error: JWT secret key is not defined");
  }

  jwt.verify(token, secretJsonKey, (err: any, user: any) => {
    if (err) {
      return res.status(403).send("Error with verify token");
    }
    next();
  });
}

function decodedingToken(req: Request, res: Response) {
  const secretJsonKey = process.env.ACCESS_SECRET_TOKEN as Secret;
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("Authorization header is missing");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Token is missing");
  }

  const decodedToken = jwt.verify(token, secretJsonKey) as JwtPayload;
  const userId = decodedToken.userId;
  return userId;
}

async function validUserDetails(email: string, password: string) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (isPasswordValid) {
    return user.id;
  } else {
    return null;
  }
}

async function hashPssword(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

