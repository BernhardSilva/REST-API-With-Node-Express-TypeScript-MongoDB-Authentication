import express from 'express';

import { getUserByEmail } from 'db/users';



export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { username, email, password } = req.body;

		if (!email || !email || !password) {
			return res.sendStatus(400);
		}

        const existingUser = await getUserByEmail(email);
        if (!existingUser) {
            return res.sendStatus(400);
        }

	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
