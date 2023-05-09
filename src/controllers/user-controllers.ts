import userRepository from "../repositories/user-repository";
import { Request, Response } from "express";
import { validate } from "../utils/Commonfunctions";
import { body } from "express-validator";
import { MESSAGES, USER_ROLES } from "../constants";
import { IUser_d } from "../types/user";
import { isUniqueEmail, isRoleValid } from "../utils/express-validations";

const validations = {
  create: [
    body("email")
      .notEmpty()
      .trim()
      .isEmail()
      .custom(isUniqueEmail)
      .withMessage(MESSAGES.EMAIL_REQUIRED_AND_UNIQUE),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 chars long")
      .withMessage(MESSAGES.PASSWORD_REQUIRED),
    body("role")
      .trim()
      .notEmpty()
      .custom(isRoleValid)
      .withMessage(MESSAGES.ROLE_REQUIRED_AND_VALID),
  ],
};

const getAll = async (req: Request, res: Response) => {
  try {
    const users: Array<IUser_d> = await userRepository.getAll();
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.getById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    await validate(req, validations.create);
    const user = await userRepository.create(req.body);
    res.status(200).json({ message: "User created successfully", data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const updateById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.updateById(req.params.id, req.body);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.deleteById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json({ message: "User deleted successfully", data: user });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
