const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Calling our list() from theaters.list table
async function list(req, res){
  const data = await theatersService.list()  
  res.json({data})
}


module.exports = {
    list: asyncErrorBoundary(list),
}