import { json } from '@sveltejs/kit';
import {con} from '$lib/db/db.js'

export const actions = {
    default: () =>{
        console.log('heres')
    }
}