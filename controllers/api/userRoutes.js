const router = require('express').Router();
const { User } = require('../../models');

// Route for user registration
router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create({
            
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // After successful registration, redirect to the login page
        res.redirect('/login');
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route for user login
router.post("/login", async (req, res) => {
  try {
      // Retrieve user data based on the email provided
      const userData = await User.findOne({ where: { email: req.body.email } });

      // If no user is found with the provided email, return a login failure response
      if (!userData) {
          res.status(400).json({ message: "Invalid email or password. Please try again!" });
          return;
      }

      // Check if the provided password matches the hashed password in the database
      const validPassword = await userData.checkPassword(req.body.password);

      // If the password is invalid, return a login failure response
      if (!validPassword) {
          res.status(400).json({ message: "Invalid email or password. Please try again!" });
          return;
      }

      // If the login is successful, set session variables
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      console.log('Session after login:', req.session);

      // Redirect the user to the home page
      res.redirect('/');
  } catch (err) {
      // If an error occurs, log it and return a server error response
      console.error(err);
      res.status(500).json(err);
  }
});

// Route for user logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;