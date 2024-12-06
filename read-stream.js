const fs = require("fs");

const reader = fs.createReadStream("./files/test.txt");

reader.on("open", () => {
  console.log("file opened!");
  // reader.pause();
  // setTimeout(() => {
  //   reader.resume();
  // }, 3000); // wait for 3 seconds before
});

// Examples: flowing mode
// reader.on("data", (chunk) => {
//   console.log("got some data: ", chunk.toString());
// });

// Examples: paused mode
reader.on("readable", function () {
  let chunk;
  while ((chunk = reader.read()) != null) {
    console.log("got some data: ", chunk.toString());
  }
});

reader.on("pause", () => {
  console.log("stream paused!");
});

reader.on("resume", () => {
  console.log("stream in flowing mode!");
});

reader.on("end", () => {
  console.log("stream ended!");
});

reader.on("close", () => {
  console.log("stream closed!");
});
