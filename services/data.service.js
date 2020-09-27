let accountDetails={
    1001:{name:"user1",acno:1001,pin:4387,password:"userone",balance:3000,transactions:[]},
    1002:{name:"user2",acno:1002,pin:1234,password:"usertwo",balance:3500,transactions:[]},
1003:{name:"user3",acno:1003,pin:1598,password:"userthree",balance:4000,transactions:[]},
1004:{name:"user4",acno:1004,pin:1095,password:"userfour",balance:3050,transactions:[]},
1005:{name:"user5",acno:1005,pin:1098,password:"userfive",balance:300,transactions:[]}

}
let currentuser;

 const register =(name,acno,pin,password)=>{
    // console.log("register called");
    if (acno in accountDetails){
      //alert("Account already exists.please login");
      return {
          status:false,
          statusCode:422,
          message:'Account already exists.please login'
      }
    }
    accountDetails[acno]={
      name,
      acno,
      pin,
      password,
      balance:0,
      transactions:[ ]
    }
    return{
        status:true,
        statusCode:200,
        message:"Account created successfully.please login"
    }
    }
    
   
    const login = (req,acno1,password) =>{

        var acno=parseInt(acno1 );
       // console.log(accountDetails);
        var data =accountDetails;
        if(acno in data){
            var pwd=data[acno].password
        
            if(pwd==password){
               req.session.currentUser=data[acno];
                return{
                    status:true,
                    statusCode:200,
                    message:'login success'
                }
            }
          }
        return{
            status:false,
            statusCode:422,
            message:'invalid credentials'
        }
    }
  
    const  deposit=(req,dpacno,dppin,dpamt)=>{
    //   if(!req.session.currentUser){
      //       return{
        //         status:false,
          //       statusCode:401,
            //     message:'Please Login'}
  //  }
         
          var data=accountDetails;
          if(dpacno in data){
            var mpin=data[dpacno].pin
            if(dppin==mpin){
              data[dpacno].balance+=parseInt(dpamt);
              data[dpacno].transactions.push({
                  amount:dpamt,
                  type:'Credit',
                  id:Math.floor(Math.random()*100000)
              })
              return{
                status:true,
                statusCode:200,
                message:"account has been credited",
                balance:data[dpacno].balance
              }
            }
          }
          else{
            return{
              status:false,
              statusCode:422,
              message:"incorrect account Details"
            }
          }
        }
     const withdraw=(wacno,wpin,wamt)=>{
        console.log(wacno,wpin,wamt)
        var data=accountDetails;
        if(wacno in data){
          var mpin=data[wacno].pin
          if(data[wacno].balance<parseInt(wamt)){
            return{
              status:false,
              statusCode:422,
              message:"insufficient balance",
              balance:data[wacno].balance
            }
          }
          else if(wpin==mpin){
            data[wacno].balance-=parseInt(wamt)
            data[wacno].transactions.push({
              amount:wamt,
              type:'Debit'
            })
          //  this.saveDetails();
            return{
              status:true,
              statusCode:200,
              message:"account has been debited",
              balance:data[wacno].balance
            }
          }
        }
    else{
      return{
        status:false,
        statusCode:422,
        message:"invalid cred"
      }
    }
      }
const getTransactions=(req)=>{
    return accountDetails[req.session.currentUser.acno].transactions;
}
const deleteTransaction=(req,id)=>{
  let transactions=accountDetails[req.session.currentUser.acno].transactions;
  transactions=transactions.filter(t=>{
    if(t.id==id){
      return false;
    }
    return true
  })
  accountDetails[req.session.currentUser.acno].transactions=transactions;
  return{
    status:true,
    statusCode:200,
    message:'Transaction deleted successfully'
  }
}
    module.exports= {
        register,
        login,
        deposit,
        withdraw,
        getTransactions,
        deleteTransaction
    }