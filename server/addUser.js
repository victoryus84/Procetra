const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const email = process.argv[2];     // node addUser.js email@mail.com mypassword role
const password = process.argv[3];
const role = process.argv[4] || 'USER'; // Default role is 'USER'

if (!email || !password) {
    console.error('Использование: node addUser.js [email@mail.com] [password] [role]');
    process.exit(1);
}
if (role !== 'USER' && role !== 'ADMIN') {
    console.error('Роль должна быть USER или ADMIN');
    process.exit(1);
}

async function main() {
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
            role: role,
        }
    });
    console.log(user);
    await prisma.$disconnect();
}

main();