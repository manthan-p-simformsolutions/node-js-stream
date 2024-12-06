const { pipeline, Transform } = require("stream"); // For managing the stream flow
const fs = require("fs");
const crypto = require("crypto");
const zlib = require('zlib');

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16); // 16-byte initialization vector


// Example:1 
// Create a Cipher (Transform stream for encryption)
const encryptStream = crypto.createCipheriv(algorithm, key, iv);

// Create a Decipher (Transform stream for decryption)
const decryptStream = crypto.createDecipheriv(algorithm, key, iv);

// Example file paths
const inputFilePath = "./files/test.txt";
const encryptedFilePath = "./files/test.txt.enc";
const decryptedFilePath = "./files/test.txt.dec";

// Write encrypted data to a file
pipeline(
  fs.createReadStream(inputFilePath), // Read the input file
  encryptStream, // Encrypt the data
  fs.createWriteStream(encryptedFilePath), // Write encrypted data
  (err) => {
    if (err) {
      console.error("Encryption failed:", err);
    } else {
      console.log("File encrypted successfully.");

      // Read the encrypted file and decrypt it
      pipeline(
        fs.createReadStream(encryptedFilePath), // Read the encrypted file
        decryptStream, // Decrypt the data
        fs.createWriteStream(decryptedFilePath), // Write decrypted data
        (err) => {
          if (err) {
            console.error("Decryption failed:", err);
          } else {
            console.log("File decrypted successfully.");
          }
        }
      );
    }
  }
);

// Example:2
const reportProgress = new Transform({
  transform(chunk, _encoding, callback) {
    process.stdout.write('Processing.....\n');
    callback(null, chunk);
  }
});

fs.createReadStream('./files/big.txt')
  .pipe(zlib.createGzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream('./files/big.txt.gz'))
  .on('finish', () => console.log('Done'));