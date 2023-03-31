import prisma from "../datasources/db.js"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const hash = await bcrypt.hash(password, 13);

        const result=  await prisma.users.create({
            data: {
                username,
                email,
                password: hash
            }
        });

        res.status(201).json({
            ok: true,
            message: `Usuario creado correctamente`, 
            data: result
        })

    } catch (err) {
        res.status(500).json({
            ok:false,
            message: err
        })
    }
}


export const login = (req, res) => {

}
export const logout = (req, res) => {

}