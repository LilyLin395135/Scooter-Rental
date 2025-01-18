import { findUserByCellphone, insertUser } from "../models/user.js";

export const createUser = async (req, res, next) => {
    try {
        const { name, cellphone } = req.body;

        const existingUser = await findUserByCellphone(cellphone);
        if (existingUser) {
            return res.status(400).json({ message: "User with this cellphone already exists." });
        }

        const newUser = await insertUser(name, cellphone);

        res.status(201).json({ message: "User created successfully.", user: newUser });
    } catch (error) {
        next(error);
    }
};

export const getUsers = (req, res, next) => {
    try {
        res.status(200).json({ users: ["user1", "user2"] });
    } catch (error) {
        next(error);
    }
};
