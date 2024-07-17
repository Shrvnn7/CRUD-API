const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({ username })
        console.log(user)
        if( !user || !await bcrypt.compare(password, user.password)){
            console.log('Invalid Credentials')
            return res.status(401).send('Invalid Credentials')
        }
        const token = jwt.sign({ id: user._id, role: user.role}, 'your_jwt_secret', { expiresIn: '1h' })
        console.log(token)
        res.status(200).send({ token })

    } catch(error) {
        res.status(400).send(error)
    }
}


const registerUser = async (req, res) => {
    try{
        const { username, password, role } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({username, password: hashedPassword, role})
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
}

// Middleware to verify token and role
const authMiddleware = (role) => (req, res, next) => {
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).send('Access Denied')
    }
    try{
        const decoded = jwt.verify(token, 'your_jwt_secret')
        if(role && role !== decoded.role){
            return res.status(403).send('Access forbidden')
        }
        req.user = decoded;
        next()
    } catch (error){
        res.status(400).send('Invalid token')
    }
}


module.exports = {
    loginUser,
    registerUser,
    authMiddleware
}