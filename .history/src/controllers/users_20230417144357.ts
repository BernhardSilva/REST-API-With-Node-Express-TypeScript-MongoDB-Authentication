import express from 'express';
import { deleteUserById, getUsers } from '../db/users';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users)

    } catch (error) {

        console.log(error)
        return res.sendStatus(400)
    }
}

export const deteteUsers = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params

        const deleteUser = await deleteUserById(id)

        return res.status(200).json(deleteUser)

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}