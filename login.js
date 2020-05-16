const path = require('path');
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/',(req,res,next)=>{
	res.render('index',{
		user:res.cookies.user
	});
});

app.get('/login',(req,res,next)=>{
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




app.listen(3000,()=>{
	console.log('App listening on port 3000');
});

