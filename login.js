const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieman = require('cookie-parser');
const app = express();

app.use(helmet());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieman());



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req,res,next)=>{

	if(req.query.msg == "fail"){
		res.locals.msg = "Login Failed!! Try again";

	}else if(req.query.msg == "success"){

		res.locals.msg = "Login successful"
	}else{

		res.locals.msg = ``
	}

	next();
})

app.get('/',(req,res,next)=>{
	res.render('index',{
		username:req.cookies.user
	});
});

app.get('/login',(req,res,next)=>{

	console.log(req.query);
	res.render('login');


});

app.post('/process_login', (req,res,next)=>{

	const email = req.body.email;
	const pwd = req.body.password;

	if(pwd === "realmenARE1234"){
		res.cookie('user',email);
		res.redirect('/?msg=success');
	}else{

		res.redirect('/login?msg=fail')
	}
	//res.json(req.body);
});

app.get('/logout',(req,res,next)=>{
	res.clearCookie('user');
	res.redirect('/login');
});

app.get('/story/:storyId',(req,res,next)=>{
	res.send(`The message url is: ${req.params.storyId}->${req.params.post}`)
})




app.listen(3000,()=>{
	console.log('App listening on port 3000');
});

