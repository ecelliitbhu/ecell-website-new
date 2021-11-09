import bcrypt from 'bcrypt'

export default async function decrypt(myPlaintextPassword,hash){
    return (await bcrypt.compare(myPlaintextPassword, hash));
}
