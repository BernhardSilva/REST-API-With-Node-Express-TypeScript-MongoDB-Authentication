
import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { random } from '../helpers';
import { authentication } from '../helpers';

export const login = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.sendStatus(400)
            return
        }

        const user = await getUserByEmail(email)

        if (!user) {
            res.sendStatus(400)
            return
        }

        const expectedHash = authentication(user.authentication.salt, password)

        if (user.authentication.password !== expectedHash) {
            res.sendStatus(403)
            return
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save()

        res.cookie('BERN-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' })
        res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}


export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.sendStatus(400);
		}

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
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
