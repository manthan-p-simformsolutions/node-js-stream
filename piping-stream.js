const fs = require("fs");
const { pipeline } = require("stream");

const original = fs.createReadStream("./files/test.txt");
const copy1 = fs.createWriteStream("./files/test.copy1.txt");
const copy2 = fs.createWriteStream("./files/test.copy2.txt");

// Example: 1
original.pipe(copy1);
original.pipe(copy2);

// Example: 2
pipeline(original, copy1, (err) => {
  if (err) {
    console.error("Failed:", err);
  } else {
    console.log("File copied successfully.");
  }
});

pipeline(original, copy2, (err) => {
  if (err) {
    console.error("Failed:", err);
  } else {
    console.log("File copied successfully.");
  }
});
