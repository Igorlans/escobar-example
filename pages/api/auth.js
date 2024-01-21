import prisma from "@/prisma/client";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ message: 'Користувача з таким email не існує' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Непраильний пароль' });
        }
        res.status(200).json({ message: 'Вхід виконано', userId: user.id });
    } else {
        res.status(405).json({ message: 'Метод не дозволено' });
    }
}
