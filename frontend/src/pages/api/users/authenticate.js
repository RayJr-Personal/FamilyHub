const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import getConfig from 'next/config';

import { apiHandler} from '@/helpers/api/api-handler';
import { usersRepo } from '@/helpers/api/users-repo';

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: authenticate
});

export function authenticate(req, res) {
    const { email, password } = req.body;
    const user = usersRepo.find(u => u.email === email);

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Email or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // return basic user details and token
    return res.status(200).json({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        token
    });
}