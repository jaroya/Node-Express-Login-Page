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

app.get('/',(req,res)=>{
	res.send('Login page')
});





app.listen(3000,()=>{
	console.log('App listening on port 3000');
});

