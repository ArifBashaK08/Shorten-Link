import { userModel } from "../../models/userModel.js"

//====== CRUD operations on User data ======//

export const getUserFromAPI = async (req, res) => {
    try {
        const allUsers = await userModel.find({})
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ error: `Internal server error\n${error}` })
    }
}

export const postUserOnAPI = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const checkUser = await userModel.findOne({ email: email })
        if (checkUser) {
            res.status(400).json({ msg: `Error - User with email - ${email} already exists` })
        }
        await userModel.create({
            name: name,
            email: email,
            password: password,
        })
        res.status(200).json({ msg: `User with email - ${email} has added successfully` })
    } catch (error) {
        res.status(500).json({ error: `Something went wrong\n${error.message}` })
    }
}

export const getUserWithID = async (req, res) => {
    const id = req.params
    try {
        const getUser = await userModel.findById(id)
        if (!getUser) {
            return res.status(404).json({ msg: `User with ID - ${id} not found` })
        }
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({ msg: `User not found - User with ID - ${id} not found` })
    }
}

export const updateUserWithID = async (req, res) => {
    const id = req.params
    const { name, email, password } = req.body
    try {
        const foundUser = await userModel.findById(id)

        if (!foundUser) {
            return res.status(404).json({ msg: `Data not found - User with ID - ${id} not found` })
        }

        if (name) foundUser.name = name
        if (email) foundUser.email = email
        if (password) foundUser.password = password

        await foundUser.save()

        res.status(200).json({ msg: `User has updated successfully` })
    } catch (error) {
        res.status(500).json({ error: `Something went wrong\n${error.message}` })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params
    try {
        const deleteUser = await userModel.findByIdAndDelete(id)

        if (!deleteUser) {
            return res.status(404).json({ msg: `User with ID - ${id} not found` })
        }

        res.status(200).json({ msg: `User has deleted successfully` })

    } catch (error) {
        res.status(500).json({ msg: `something went wrong..!\n${error.message}` })
    }
}