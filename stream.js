const fs = require("fs");
const server = require("http").createServer();
const PORT = 8001;

server.on("request", (req, res) => {
  // Inefficient Way - ❌
  // fs.readFile("./files/big.txt", (err, data) => {
  //   if (err) throw err;
  //   res.end(data);
  // });

  // Using Stream - ✅
  const src = fs.createReadStream("./files/big.txt");
  src.pipe(res);

  // Hit: curl localhost:8001/request
});

server.listen(PORT, () => console.log(`Server Starting On Port: ${PORT}`));
