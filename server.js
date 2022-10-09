import express from "express";
import bcrypt from "bcrypt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore,doc,collection,setDoc,getDoc,updateDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgEavvtNS7UAdmSHlAQHY4OzngXZBGamc",
  authDomain: "cidrie-project1.firebaseapp.com",
  projectId: "cidrie-project1",
  storageBucket: "cidrie-project1.appspot.com",
  messagingSenderId: "66283641389",
  appId: "1:66283641389:web:fe82e6749f3e454c5576a4",
  measurementId: "G-1ZFSHFZJHE"
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);
const db=getFirestore();
const analytics = getAnalytics(app);

//init server
  app=express();
//middlewares
app.use(express.static("public"));
app.use(express.json())//enable form sharing

//routes
//home route
app.get('/',(req,res)=>{
    res.sendFile("index.html",{root: "public" })
})
//signup
app.get('/signup',(req,res)=>{
    res.sendFile("signup.html",{root: "public" })

})
app.post('/signup',(req,res)=>{
   const{ name, email,password,number,tac}=req.body;
   //form validations 
   if(name.length < 3){
    res.json({'alert':'name must be  3 letters long'});
    } else if(!email.length){
        res.json({'alert': 'enter your email'});
    }else if(password.length < 8){
        res.json({'alert': 'password must be atleast 8 letter long'});
    }else if(!Number(number) || number.value.length < 10){
        res.json({'alert': 'invalid number, Enter a valid one'});

    }
    else if(!tac){
     res.json({'alert':'please accept the terms and conditions'});
        }
        else{
            //store the data in db
            const users=collection(db, "users");
            getDoc(doc(users, email)).then(user=>{
                if(user.exists()){
                    return res.json({'alert':'email already exists'})
                }else{
                    //encrypt the password
                    bcrypt.genSalt(10,(err,salt)=>{
                        bcrypt.hash(password,salt,(err,hash)=>{
                            req.body.password=hash;
                            req.body.seller=false;
                            //set the doc
                            setDoc(doc(users,email),req.body).then(data=>{
                                res.json({
                                    name:req.body.name,
                                    email:req.body.email,
                                    seller:req.body.seller,
                                })
                            })
                        })
                    })
                }
            })
        }
})
//404 route
app.get('/404',(req,res)=>{
    res.sendFile("404.html",{root:"public"})
})
app.use((req,res)=>{
    res.redirect('/404')
})
app.listen(4000,()=>{
    console.log('listening on port 4000');
})