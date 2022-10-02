import express from "express"
import fs from "fs/promises"
import { constants } from "fs";
const server = express();
const port = (process.env.PORT || 8080);


server.set('port', port);
server.use(express.static('web_I'));
server.use(express.json());

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

server.post("/save/:name", async (req,res,next)=>{

  console.log(`Saving ${req.params.name}`);
  console.log(req.body);

  let fileName = req.params.name;
  let path = `./web_I/data/${fileName}`
  let exist = false

  try {
    await fs.access(path, constants.F_OK);
    exist = true;
  } catch (error) {
    console.log(error)
  }

  if(!exist){
    await fs.writeFile(path,JSON.stringify(req.body));
    res.end()
  } else{
    res.status(500).send({error:"allready a file with this name"}).end();
  }
  


})

server.listen(server.get('port'), function () {
     console.log('server running', server.get('port'));
});
