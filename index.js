message:'Please Login'
});
}else{
next();
}
};
app.get('/',(req,res)=>{
res.status(200).send("Hello world");
})
app.post('/',(req,res)=>{
res.send("post method");
})
app.post('/register',(req,res)=>{
dataService.register(req.body.name,req.body.acno,req.body.pin,req.body.password,req.body.balance)
.then(result=>{
res.status(result.statusCode).json(result);
})
//  res.status(result.statusCode).json(result);
//res.status(200).send("success");
//})
app.post('/login',(req,res)=>{
const result=dataService.login(req,req.body.accno,req.body.password)
res.status(result.statusCode).json(result);
})
app.post('/deposit',authMiddleware,(req,res)=>{
const result=dataService.deposit(req,req.body.dpacno,req.body.dppin,req.body.dpamt)
.then(result=>{
res.status(result.statusCode).json(result);
})
app.post('/withdraw',authMiddleware,(req,res)=>{
dataService.withdraw(req.body.wacno,req.body.wpin,req.body.wamt)
.then(result=>{
res.status(result.statusCode).json(result);
})
app.get('/transactions',authMiddleware,(req,res)=>{
dataService.getTransactions(req)
.then(result=>{
res.status(result.statusCode).json(result);
});
})
app.delete('/transactions/:id',authMiddleware,(req,res)=>{
//console.log(req.params.id)
dataService.deleteTransaction(req,req.params.id)
.then(result=>{
res.status(result.statusCode).json(result);
}); 
})
app.put('/',(req,res)=>{
res.send("Put Method");
})
app.patch('/',(req,res)=>{
res.send("Patch method");
})
app.delete('/',(req,res)=>{
res.send("delete method");
})
app.listen(3000,()=>{
console.log("Server started at port 3000");
})