import { redirect } from 'react-router-dom'
import { getSession } from "./session.ts"

export async function studentProfileLoader ()
{
    const { user, } = getSession()

    if ( !user )
    {
        return redirect( '/auth/login' )
    }
    console.log( user )
    return { user }

}


export async function studentHomeLoader() {
	// const { user } = getSession()

	// if (!user) {
	// 	return redirect('/auth/login')
	// }
	// console.log(user)
	// return { user }
}