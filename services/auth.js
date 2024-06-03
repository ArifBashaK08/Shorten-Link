import jwt from "jsonwebtoken"

const key = "ArifB@$h@#08"

export const setUser = (user) => {

    return jwt.sign({
        _id: user.id,
        email: user.email,
        role: user.role,
    }, key)
}

export const getUser = (token) => {

    if (!token) return null
    try {
        return jwt.verify(token, key);
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return null;
    }
}