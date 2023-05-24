const { createHmac, pbkdf2Sync, createCipheriv } = require("crypto");

export function encryptPassword(initial,password){
    initial = Buffer.from(initial, 'utf-8').toString().trim();
    password = Buffer.from(password, 'utf16le').toString().trim();
    console.log(password);
    const salt = createHmac('sha1', initial).update(initial).digest();
    console.log(salt.toString());
    const keyLength = 32;
    const ivLength = 16;
    const keyiv = pbkdf2Sync(initial, salt, 10, keyLength + ivLength, "sha1");
    console.log(keyiv.toString());

    const key = keyiv.subarray(0, keyLength);
    console.log(key.toString());
    const iv = keyiv.subarray(keyLength, keyLength + ivLength);
    console.log(iv.toString());
    const cipher = createCipheriv('aes-256-cbc', new Buffer(key), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]).toString('base64');
    return encrypted;

}
