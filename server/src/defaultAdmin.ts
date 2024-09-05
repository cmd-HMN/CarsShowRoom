import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Admin } from './models/admin.model';
import 'dotenv/config'

async function defaultAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URL as string).then(() => {
            console.log('Server is up');
        });

        const adminEmail = 'admin@gmail.com';
        const password = '@Dmin123'

        const admin = new Admin({
            name: 'admin',
            email: adminEmail,
            password: password,
        });

        await admin.save();
        console.log('admin created');
        console.log(adminEmail)
        console.log(password)

        mongoose.connection.close();
    } catch (err) {
        console.log(err);
    }
}

defaultAdmin();
