const fs = require("fs");
const readableStream = fs.createReadStream("./files/test.txt");
const writableStream = fs.createWriteStream("./files/test2.txt");

// Example: Reads chunks of data from an input stream and writes to the destination
readableStream.on("data", function (chunk) {
  writableStream.write(chunk);
});

readableStream.on("end", () => {
  writableStream.end(() => {
  console.log('Finished writing to the file.');
});
});

// Example: Writes data to a file
writableStream.write('Hello, World!\n');
writableStream.write('This is a Writable Stream example.\n');
writableStream.end(() => {
  console.log('Finished writing to the file.');
});
