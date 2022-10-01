import express from "express"
import fs from "fs/promises"
const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('web_I'));


server.get("/collections", async (req,res) =>{
  let files = [];
  try {
     files = await fs.readdir("./web_I/data");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }

  res.json(files)

})

server.get("/", (req,res,next)=>{
  res.status(200).send("FLASH CARD").end();
});

server.listen(server.get('port'), function () {
     console.log('server running', server.get('port'));
});
