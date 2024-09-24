import express from 'express'

const route = express.Router()


console.log('dfkdjfkdfdjfdfiuegodj')
import { authController } from '../controllers/authController'
const {signUp} = authController

route.post('/signup',signUp)

export default route
