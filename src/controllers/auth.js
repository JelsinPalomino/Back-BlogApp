import prisma from "../datasources/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;
    
        const q = await prisma.users.findMany({
            where: {
                OR: [
                    { username: username},
                    { email: email}
                ]
            }
        })

        if (q.length) {
            return res.status(409).json(
                `Username y email ya existen`
            )
        }

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


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            res.status(401).json({ message: `Envio de datos incorrecto` });
            return
        }

        const usuario = await prisma.users.findFirst({
            where: { 
                username
             },
        })

        if (!usuario) {
            res.status(401).json({ message: `Usuario equivocado` });
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, usuario.password)
        if(!isPasswordCorrect) {
            res.status(401).json({ message: `Password incorrecto` });
            return
        }
        
        const token = jwt.sign(
            {username, password},
            process.env.TOKEN_SECRET,
            {
                expiresIn: "4h"
            });

        res.status(201).json({username, token})

    } catch (err) {
        res.status(500).json({
            ok:false,
            message: err
        })
    }
}

export const logout = (req, res) => {

}