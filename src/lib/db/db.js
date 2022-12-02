import mysql from 'mysql2/promise'
import { db } from '$lib/server/env'

export const con = mysql.createPool({
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.database
})