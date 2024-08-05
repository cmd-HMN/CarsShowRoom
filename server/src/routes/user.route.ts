import express from 'express';
import { signUp } from '../controllers/user.controller';
import {check} from 'express-validator'
const router = express.Router()

router.post('/sign-up', [
    check("email", "Email is Required").isEmail().normalizeEmail({gmail_remove_dots: true}),
    check("password", "Password is Required(should have (A-Z)(NUMBER)(SPECIAL CHAR !@$#&^)").isLength({min: 6}).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/),
    check("name", "Name is Required").not().isEmpty()
], signUp)



export default router;