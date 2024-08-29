const express = require('express');
const app = express();
const PORT = 3000;


// Middleware to serve static files like CSS
app.use(express.static('public'));

// Set EJS as the template engine (optional)
app.set('view engine', 'ejs');


const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay(); // Sunday - Saturday : 0 - 6
  const hour = date.getHours(); // 0 - 23

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // within working hours, proceed to next middleware/route
  } else {
    res.send("Our website is only available from Monday to Friday, 9 AM to 5 PM.");
  }
};

app.use(workingHoursMiddleware);

// Routes
app.get('', (req, res) => {
  res.render('Home'); // render 'index.ejs' in views folder
});

app.get('/Services', (req, res) => {
  res.render('Services'); // render 'services.ejs' in views folder
});

app.get('/Contact', (req, res) => {
  res.render('Contact'); // render 'contact.ejs' in views folder
});

app.get('/Home', (req, res) => {
  res.render('Home'); // render 'home.ejs' in views folder
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
