const express = require('express');
bodyParser = require('body-parser');
const morgan = require('morgan');
uuid = require('uuid');
const { check, validationResult } = require('express-validator');

const mongoose = require('mongoose');
const Models = require('./models.js');

// call movie and user modals from modals.js
const Movies = Models.Movie;
const Users = Models.User;

// Deprecation warning - suppress
mongoose.set('strictQuery', true);

// Connecting LOCAL myFlixDB via Mongoose to perform CRUD operations
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS - allowing requests from other specified origins (here: default all origins)
const cors = require('cors');
app.use(cors());

// Passport authentication middleware
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');


// let users = [
//   {
//     id: 1,
//     name: "Jane Doe",
//     favouriteMovies: []
//   },
//   {
//     id: 2,
//     name: "Max Mustermann",
//     favouriteMovies: []
//   }
// ];

// let movies = [
//   {
//     Title: 'Dirty Dancing',
//     Director: {
//       Name: 'Emile Ardolino',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: 'Eleanor Bergstein',
//     Year: 1987,
//     Genre: {
//       Name: 'Drama',
//       Description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
//     },
//     Decription: 'Spending the summer at a Catskills resort with her family, Frances "Baby" Houseman falls in love with the camp\'s dance instructor, Johnny Castle.',
//     stars: [
//       'Patrick Swayze',
//       'Jennifer Grey',
//       'Jerry Orbach'
//     ]
//   },
//   {
//     Title: 'The Science of Sleep',
//     Director: {
//       Name: 'Michel Gondry',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: 'Michel Gondry',
//     Year: 2006,
//     Genre: {
//       Name: 'Comedy',
//       Description: 'Comedy films are " make \'em laugh" films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters.'
//     },
//     Decription: 'A man entranced by his dreams and imagination is love-struck with a French woman and feels he can show her his world.',
//     Stars: [
//       'Gael García Bernal',
//       'Charlotte Gainsbourg',
//       'Miou-Miou'
//     ]
//   },
//   {
//     Title: 'Midsommar',
//     Director: {
//       Name: 'Ari Aster',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: 'Ari Aster',
//     Year: 2019,
//     Genre: {
//       Name: 'Horror',
//       Description: 'Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs. Cinematic techniques used in horror films have been shown to provoke psychological reactions in an audience.'
//     },
//     Decription: 'A couple travels to Northern Europe to visit a rural hometown\'s fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.',
//     Stars: [
//       'Florence Pugh',
//       'Jack Reynor',
//       'Vilhelm Blomgren'
//     ]
//   },
//   {
//     Title: 'Get Out',
//     Director: {
//       Name: 'Jordan Peele',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: 'Jordan Peele',
//     Year: 2017,
//     Genre: {
//       Name: 'Horror',
//       Description: 'Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs. Cinematic techniques used in horror films have been shown to provoke psychological reactions in an audience.'
//     },
//     Decription: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
//     Stars: [
//       'Daniel Kaluuya',
//       'Allison Williams',
//       'Bradley Whitford'
//     ]
//   },
//   {
//     Title: 'The Little Mermaid',
//     Director: {
//       Name: 'John Musker',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: [
//       'John Musker',
//       'Ron Clements',
//       'Hans Christian Andersen'
//     ],
//     Year: 1989,
//     Genre: {
//       Name: 'Animation',
//       Description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI).'
//     },
//     Decription: 'A mermaid princess makes a Faustian bargain in an attempt to become human and win a prince\'s love.',
//     Stars: [
//       'Jodi Benson (voice)',
//       'Samuel E. Wright (voice)',
//       'Rene Auberjonois(voice)'
//     ]
//   },
//   {
//     Title: 'The Lobster',
//     Director: {
//       Name: 'Yorgos Lanthimos',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: [
//       'Yorgos Lanthimos',
//       'Efthymis Filippou'
//     ],
//     year: 2015,
//     Genre: {
//       Name: 'Drama',
//       Description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
//     },
//     Decription: 'In a dystopian near future, according to the laws of The City, single people are taken to The Hotel, where they are obliged to find a romantic partner in 45 days or they\'re transformed into beasts and sent off into The Woods.',
//     Stars: [
//       'Colin Farrell',
//       'Rachel Weisz',
//       'Jessica Barden'
//     ]
//   },
//   {
//     Title: 'Pappa Ante Portas',
//     Director: {
//       Name: 'Vicco von B&uuml;low',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: 'Vicco von B&uuml;low',
//     Year: 1991,
//     Genre: {
//       Name: 'Comedy',
//       Description: 'Comedy films are " make \'em laugh" films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters.'
//     },
//     Decription: 'After ordering enough typewriting paper for 40 years, just to get discount, Heinrich Lohse is forced to retire. The former manager has plenty of time now to spend with his wife and their 16 year old son. But - do they want that?',
//     Stars: [
//       'Loriot',
//       'Evelyn Hamann',
//       'Irm Herrmann'
//     ]
//   },
//   {
//     Title: 'The Neon Demon',
//     Director: {
//       Name: 'Nicolas Winding Refn',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: [
//       'Nicolas Winding Refn',
//       'Mary Laws',
//       'Polly Stenham'
//     ],
//     Year: 2016,
//     Genre: {
//       Name: 'Horror',
//       Description: 'Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs. Cinematic techniques used in horror films have been shown to provoke psychological reactions in an audience.'
//     },
//     Decription: 'An aspiring model, Jesse, is new to Los Angeles. However, her beauty and youth, which generate intense fascination and jealousy within the fashion industry, may prove themselves sinister.',
//     Stars: [
//       'Elle Fanning',
//       'Christina Hendricks',
//       'Keanu Reeves'
//     ]
//   },
//   {
//     Title: 'Up',
//     Director: {
//       Name: 'Pete Docter',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: [
//       'Pete Docter',
//       'Bob Peterson',
//       'Tom McCarthy'
//     ],
//     Year: 2009,
//     Genre: {
//       Name: 'Animation',
//       Description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI).'
//     },
//     Decription: '78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.',
//     Stars: [
//       'Edward Asner (voice)',
//       'Jordan Nagai (voice)',
//       'John Ratzenberger (voice)'
//     ]
//   },
//   {
//     Title: 'Lost In Translation',
//     Director: {
//       Name: 'Sofia Coppola',
//       Bio: 'Movie Director',
//       Birth: 1900
//     },
//     Writers: 'Sofia Coppola',
//     Year: 2003,
//     Genre: {
//       Name: 'Drama',
//       Description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
//     },
//     Decription: 'A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.',
//     Stars: [
//       'Bill Murray',
//       'Scarlett Johansson',
//       'Giovanni Ribisi'
//     ]
//   }
// ];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my Movie database');
});

// ----------------------- Movie endpoints -----------------------

// Gets the list of data about all movies
// GET the list of data about all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find().then(movies => res.json(movies));
});

// Gets data about a single movie by title
// GET data about a single movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Gets data about a genre by name
// GET data about a genre by name
app.get('/movies/genres/:genreName', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Gets data about a director by name
// GET data about a director by name
app.get('/movies/directors/:directorName', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ "Director.Name": req.params.directorName })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// ----------------------- User endpoints -----------------------

// GET the list of all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find().then(users => res.json(users));
});

// GET data about a single user by name
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST data creating a new user
app.post('/users',
  [
    check('Username', 'Username is required (min. 5 characters)').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

// PUT data updating a user's name by ID
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate({ Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      });
  });

// PUT data adding a user's favourite movie to a list
app.put('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavouriteMovies: req.params.MovieID }
  },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// DELETE data removing a user's favourite movie from the list
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavouriteMovies: req.params.MovieID }
  },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// DELETE data removing a user by ID
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Morgan middleware logging requests
app.use(morgan('common'));

// function serving all requests of static file (here:"documenation.html") from public folder
// app.use(express.static('public'));  OLD
app.use(express.static('public'));
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Error handling middleware logging app level errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});