const http = require('http')
const fs = require('fs')

const server=http.createServer(function(req,res){
    const filename = __dirname+(req.url==='/'? '/index':req.url)+'.html';
    fs.readFile(filename,function(err,file){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(file)
    })
})

server.listen(4000, function(err,file){
    console.log("Server started at port 4000");
})