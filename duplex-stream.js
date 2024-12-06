const { Duplex } = require("stream");

class ReverseDuplexStream extends Duplex {
  _write(chunk, _encoding, callback) {
    const reversedChunk = chunk.toString().split("").reverse().join("");
    this.push(reversedChunk); // Pass the processed data to the readable side
    callback(); // Signal that the chunk has been processed
  }

  _read(size) {
    // No-op since the data is pushed in the `_write` method
  }

  _final(callback) {
    console.log('Final call')
    this.push(null); // End the readable side
    callback();
  }
}

// Create an instance of the Duplex stream
const reverseStream = new ReverseDuplexStream();

// Read data from the Duplex stream
reverseStream.on("data", (chunk) => {
  console.log("Output:", chunk.toString());
});

reverseStream.on("end", () => {
  console.log("Stream ended.");
});

// Write data to the Duplex stream
reverseStream.write("Hello");

// Wait For 3 seconds
setTimeout(() => {
  reverseStream.write("World");
  reverseStream.end(); // Signal the end of writing
}, 3000);
