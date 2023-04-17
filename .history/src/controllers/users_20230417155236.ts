import express from 'express';
import { deleteUserById, getUsers, updateUserById } from '../db/users';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users)

    } catch (error) {

        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params

        const deleteUser = await deleteUserById(id)

        return res.json(deleteUser)

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params

        const updatedUser = await updateUserById(id)


    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}