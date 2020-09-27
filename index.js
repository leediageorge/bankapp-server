const express=require('express');
const dataService=require('./services/data.service');
const session=require('express-session')

const app=express();

app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));

app.use(express.json());

//app.use((req,res,next)=> {
  //  console.log("Middleware");
    //next();
//})

const logMiddleware=(req,res,next)=>{
    console.log(req.body);
    next();
};
app.use(logMiddleware);

const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
        return res.json({
            status:false,
            statusCode:401,
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
   const result=dataService.register(req.body.name,req.body.acno,req.body.pin,req.body.password,req.body.balance)
    res.status(result.statusCode).json(result);
})
app.post('/login',(req,res)=>{
    const result=dataService.login(req,req.body.accno,req.body.password)
     res.status(result.statusCode).json(result);
 })
 app.post('/deposit',authMiddleware,(req,res)=>{
    const result=dataService.deposit(req,req.body.dpacno,req.body.dppin,req.body.dpamt)
     res.status(result.statusCode).json(result);
 })
 app.post('/withdraw',authMiddleware,(req,res)=>{
    const result=dataService.withdraw(req.body.wacno,req.body.wpin,req.body.wamt)
     res.status(result.statusCode).json(result);
 })
 app.get('/transactions',authMiddleware,(req,res)=>{
    const result=dataService.getTransactions(req)
     res.status(200).json(result);
 })
 app.delete('/transactions/:id',authMiddleware,(req,res)=>{
    //console.log(req.params.id)
    const result=dataService.deleteTransaction(req,req.params.id)
     res.status(200).json(result);
     
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