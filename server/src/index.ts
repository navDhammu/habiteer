import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { sql } from '@pgtyped/runtime'
import { ISignupUserQuery, IUserExistsQuery } from './index.types'
import { Pool } from 'pg'
import { body, validationResult } from 'express-validator'
import cookieParser from 'cookie-parser'
import { randomUUID } from 'crypto'
import { config } from 'dotenv'
import cors from 'cors'

config()
const app = express()
const pool = new Pool({
    connectionString: process.env.DB_URL,
})

const sessions: {
    [key: string]: { userId: number }
} = {}

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

const getUserByEmail = async (email: string) => {
    const userExists = sql<IUserExistsQuery>`SELECT * FROM users WHERE email = $email`
    const [user] = await userExists.run({ email }, pool)
    return user
}

const handleLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (sessions[req.cookies?.session_id])
        return res.status(403).send('Already logged in')
    next()
}

app.post(
    '/api/signup',
    handleLoggedIn,
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('passwordConfirmation').custom((value, { req }) => {
        return value === req.body.password
    }),
    async (req, res) => {
        const validations = validationResult(req)
        if (!validations.isEmpty()) return res.sendStatus(400)
        try {
            //check if user exists
            if (await getUserByEmail(req.body.email))
                return res.status(409).send('User with email already exists')

            //create user
            const passwordHash = await bcrypt.hash(req.body.password, 10)
            const signupUser = sql<ISignupUserQuery>`INSERT INTO users (email, password) VALUES ($email, $password)`
            await signupUser.run(
                { email: req.body.email, password: passwordHash },
                pool
            )
            res.status(201).send(`user ${req.body.email} has been created`)
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }
)

app.post(
    '/api/login',
    handleLoggedIn,
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    async (req, res) => {
        const validations = validationResult(req)
        if (!validations.isEmpty()) return res.sendStatus(400)

        const user = await getUserByEmail(req.body.email)

        if (!user || !(await bcrypt.compare(req.body.password, user.password)))
            return res.status(400).send('Invalid email or password')

        const sessionId = randomUUID()
        sessions[sessionId] = {
            userId: user.user_id,
        }
        res.cookie('session_id', sessionId, {
            httpOnly: true,
        })
            .json({ email: user.email })
            .end()
    }
)

app.use('/api', (req, res, next) => {
    console.log(req.cookies)
    if (!sessions[req.cookies?.session_id]) {
        return res.sendStatus(401)
    }
    next()
})

app.post('/api/logout', async (req, res) => {
    delete sessions[req.cookies.session_id]
    res.clearCookie('session_id').end()
})

app.listen(3000, () => console.log('listening'))
