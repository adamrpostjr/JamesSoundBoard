import { con } from '$lib/db/db.js'


export async function handle({ event, resolve }) {
    let user = false
    let sessionid = event.cookies.get('sessionid') || null
    if (event.cookies.get('sessionid')) {
        user = await con.query('select email from Users where sessionid = ?', [sessionid])
        if (user[0]) {
            user = user[0][0]
        }
    }
    if (user) {
        event.locals.user = user
    }
    return resolve(event);
}