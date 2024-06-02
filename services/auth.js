const userSession = new Map()

const setUser = (id, user) => {
userSession.set(id, user)
}

const getUser = (id) => {
    return userSession.get(id)
}

module.exports = {setUser,getUser}