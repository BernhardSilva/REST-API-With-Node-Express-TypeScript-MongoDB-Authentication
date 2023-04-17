
import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { random } from '../helpers';
import { authentication } from '../helpers';


export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.sendStatus(400);
		}

        const existingUser = await getUserByEmail(email);
        if (!existingUser) {
            return res.sendStatus(400);
        }

        const salt = random()

        const user = await createUser({
            email, username, authentication: {
                salt, password : authentication(salt, password)
            }
        })

        res.status(400).json(user).end()

	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
