// const sessionIDForUser = new Map() //For state-full Authentication

//For state-less Authentication
import jwt from "jsonwebtoken"

const key = "ArifB@$h@#08"

export const setUser = (/*id,*/user) => {
    // sessionIDForUser.set(id, user)//For state-full Authentication
    return jwt.sign({
        _id: user.id,
        email: user.email
    }, key)
} 

export const getUser = (token) => {
    // return sessionIDForUser.get(id)//For state-full Authentication
    if(!token) return null
    try {
        return jwt.verify(token, key);
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return null;
    }
}