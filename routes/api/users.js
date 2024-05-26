import express from "express"
import { getUserFromAPI, postUserOnAPI, getUserWithID, updateUserWithID, deleteUser } from '../../controllers/api/users.js';

const routerAPI = express.Router()

routerAPI.route('/')
    .get(getUserFromAPI)
    .post(postUserOnAPI);

routerAPI.route('/:id')
    .get(getUserWithID)
    .patch(updateUserWithID)
    .delete(deleteUser)

export default routerAPI
