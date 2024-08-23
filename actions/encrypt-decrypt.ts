import crypto from "crypto"

const algorithm: string = "aes-256-cbc"
const key: Buffer = crypto.randomBytes(32) // 32 bytes key for AES-256
const iv: Buffer = crypto.randomBytes(16) // 16 bytes IV for AES

// Define types for the encrypt and decrypt functions
type EncryptedData = string

export function encrypt(text: string): EncryptedData {
  const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  let encrypted: Buffer = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`
}

export function decrypt(encryptedText: EncryptedData): string {
  const [ivHex, encryptedHex] = encryptedText.split(":")
  const iv: Buffer = ivHex ? Buffer.from(ivHex, "hex") : Buffer.alloc(0)
  const encryptedTextBuffer: Buffer = Buffer.from(encryptedHex ?? "", "hex")
  const decipher: crypto.Decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
  let decrypted: Buffer = decipher.update(encryptedTextBuffer)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
