// const bodyParser = require('body-parser');
//import moment from 'moment/moment';
const express = require('express');
const app = express();
const port = 6054;
const moment = require('moment');
 
const{dbConnect,Pool}=require('pg')
const db=new Pool({
    user:"postgres",
    host:"127.0.0.1",
    password:"Hari@23#9",
    port:5432,
    database:"Training"
});
// app.get('/date',(req,res)=>{
//     let today = moment(); 
//     res.send(today);

// });




app.post('/users',async(req,res)=>{
    var check=await db.query("select id,name,email,phone from users where name="+req.query.name+"")
    if(check && check.rowCount===0){
        
    }
});
// *****************
app.post('roles',async(req,res)=>{
    //var check=await db.query("select id,name from roles where name="+req.query.name+"")
    var result=await db.query("insert into roles name,id values name=''"+req.query.name+"id="+req.query.id)
    var query="insert into roles name,id values name='"+req.query.name+"id="+req.query.id;
    console.log(query);
    res.json({status:"success",result:result})
})


app.put('/users/:user_id',async(req,res)=>{
    var check=await db.query("select id,name,email,phone from users where id="+req.params.user_id+"")
    if(check && check.rowCount !==0){
        var result=await db.query("update users set phone="+req.query.phone+"where id="+req.params.user_id)
        res.json({status:"success",result:result});
    }
    else{
        res.json({status:"fail",message:"record does not exist"});
    }
})

app.delete('/users/:user_id',async(req,res)=>{
    var check=await db.query("select id,name,email,phone from users where id="+req.params.user_id+"")
    if(check && check.rowCount !==0){
        var result=await db.query("update users set is_active=false where id="+req.params.user_id)
        res.json({status:"success",result:result});
    }
    else{
        res.json({status:"fail",message:"record does not exist"});
    }
})

app.get('/user/:user_id',async(req,res)=>{
    var result=await db.query("select u.id,u.name,u.email,u.phone,r.name as role_name from users u inner join user_roles ur on u.id=ur.user_id inner join roles r on r.id=ur.role_id where ur.id="+req.params.user_id)
    res.json({status:"Success",result:result.rows});
})
// *******
app.get('/rolestime/:id',async(req,res)=>{
    var result=await db.query("select r.name,r.updated_at,r.created_at from roles r where r.id="+req.params.id);
    var updatedRes=[]

    result.rows.forEach(user=>{
        user["created_at"]=moment(user.created_at).format('DD-MM-YY');
        user["created_at_time"]=moment(user.created_at).format('hh:mm');
        updatedRes.push(user); 
    });

    result.rows.forEach(user=>{
        user["updated_at"]=moment(user.updated_at).format('DD-MM-YY');
        user["updated_at_time"]=moment(user.updated_at).format('hh:mm');
        updatedRes.push(user);
    });
    //result.set("created_at", moment().format("MM/DD/YYYY"))
    res.json({status:"success",result:updatedRes});
})
 

app.get('/query/:num',(req,res)=>{
    var num=parseInt(req.params.num);
    var notprime=0;
    for(var i=2;i<num;i++) {
        if (num%i==0) {
            notprime=1;
        }
    }
    if(notprime===0){
        res.json({num,and:"prime"})
    }
    else{
        res.send("notprime")
    }
})


app.get('/isprime/:number', (req, res) => {
      const number = parseInt(req.params.number);
    
     if (isNaN(number) || number <= 1) {
           return res.status(400).json({ error: 'Invalid number. Please provide a positive integer greater than 1.' });
      }
    
        for (let i = 2; i < Math.sqrt(number); i++) {
            if (number % i === 0) {
                 return res.json({ number, isPrime: false });
             }
         }
    
         return res.json({ number, isPrime: true });
     });


     app.get('/palindrome/:num1',(req,res)=>{
        var num1=parseInt(req.params.num1);
        var num=num1;
        var remaider;
        var result=0;
        while(num1>0) {
			remaider=num1%10;
			result=result*10+remaider;
			num1=num1/10;
		}
		if(num==result) {
			res.send("it is palindrome");
		}else {
			res.send("it is not palindrome");
		}
     })

app.get('/',(req,res) => {
    res.send("Hello world");
});




app.listen(port,() => {
    console.log(`server os running on port ${port}`);
});