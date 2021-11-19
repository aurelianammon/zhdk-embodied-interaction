//start your application with 'npm start' in the terminal

//required libraries to start
require('dotenv').config();
const fetch = require('cross-fetch');
const express = require('express')
const cors = require('cors')

// creating the express instance, the backbone of our api
const app = express();

// global variables for the responses
var color = '#76E57A'
var text = 'hello my friend'
var image = '/cat.jpg'

// configuration of the express server
app.use(cors());
app.use(express.static('public'))

// index route example
app.get('/', (req, res) => {
	return res.send('Hi, I am the index of the API');
});

// text endpoint, return your string here
app.get('/text', (req, res) => {
	const data = {
		text: text
	}
	return res.send(data);
});

// color endpoint, return your color-string here
app.get('/color', (req, res) => {
	const data = {
		color: color
	}
	return res.send(data);
});

// image endpoint, return your image here
app.get('/image', (req, res) => {
	const data = {
		image: "http://" + req.get('host') + image
	}
	return res.send(data);
});

// update endpoint, change your variables if this function is called
app.get('/update', async (req, res) => {
	const data = {
		status: 'updated'
	}
	load_quote()
	// do something here with the data you have
	color = randomColor()
	return res.send(data);
});

// creating a random color
const randomColor = () => {
	let color = '#';
	for (let i = 0; i < 6; i++){
	   const random = Math.random();
	   const bit = (random * 16) | 0;
	   color += (bit).toString(16);
	};
	return color;
};

// loading a random quote from an external api
async function load_quote () {
	const response = await fetch('https://api.quotable.io/random')
	const data = await response.json();
	text = data.content
}

// example of a post request
// app.post('/', (req, res) => {
//   return res.send('Received a POST HTTP method');
// });

// example of a put request
// app.put('/', (req, res) => {
//   return res.send('Received a PUT HTTP method');
// });

// example of a delete request
// app.delete('/', (req, res) => {
//   return res.send('Received a DELETE HTTP method');
// });

// here we start the express server
app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`),
);