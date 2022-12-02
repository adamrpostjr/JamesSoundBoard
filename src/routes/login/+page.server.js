import { con } from '$lib/db/db.js'
import bcrypt from 'bcrypt'
import { redirect } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export function load(event) {
    if (event.locals.user) {
        throw redirect(303, '/admin')
    }
}



export const actions = {
    default: async (event) => {
        // -----------------------------------------------------------------------------
        // This should be cleaned up... 
        // -----------------------------------------------------------------------------
        let request = event.request
        let cookies = event.cookies

        const data = await request.formData();
        let email = data.get('email')
        let password = data.get('password')
        let remember = data.get('remember')

        let findUser = await con.query('select * from Users where email = ?', [email])
        findUser = findUser[0][0]

        if (!findUser) return { success: false };
        // compare passowords
        let passCompare = await bcrypt.compare(password, findUser.password)
        if (!passCompare) return { success: false };

        if (remember == 'on') {
            // set cookie
        }

        let sessionid = uuidv4();
        cookies.set('sessionid', sessionid)

        await con.query('update Users set sessionid = ? where email = ?', [sessionid,email])

        throw redirect(303, '/admin')
    }
};
