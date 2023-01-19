const express = require('express');
bodyParser = require('body-parser');
const morgan = require('morgan');
uuid = require('uuid');

const app = express();

// app.use(morgan('common'));
// app.use(express.static('public'));

app.use(bodyParser.json());
const mongoose = require('mongoose');
const Models = require('.models.js');

// call movie and user modals from modals.js
const Movies = Models.Movie;
const Users = Models.User;

let users = [
  {
    id: 1,
    name: "Jane Doe",
    favouriteMovies: []
  },
  {
    id: 2,
    name: "Max Mustermann",
    favouriteMovies: []
  }
];

let movies = [
  {
    Title: 'Dirty Dancing',
    Director: {
      Name: 'Emile Ardolino',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: 'Eleanor Bergstein',
    Year: 1987,
    Genre: {
      Name: 'Drama',
      Description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
    },
    Decription: 'Spending the summer at a Catskills resort with her family, Frances "Baby" Houseman falls in love with the camp\'s dance instructor, Johnny Castle.',
    stars: [
      'Patrick Swayze',
      'Jennifer Grey',
      'Jerry Orbach'
    ]
  },
  {
    Title: 'The Science of Sleep',
    Director: {
      Name: 'Michel Gondry',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: 'Michel Gondry',
    Year: 2006,
    Genre: {
      Name: 'Comedy',
      Description: 'Comedy films are " make \'em laugh" films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters.'
    },
    Decription: 'A man entranced by his dreams and imagination is love-struck with a French woman and feels he can show her his world.',
    Stars: [
      'Gael García Bernal',
      'Charlotte Gainsbourg',
      'Miou-Miou'
    ]
  },
  {
    Title: 'Midsommar',
    Director: {
      Name: 'Ari Aster',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: 'Ari Aster',
    Year: 2019,
    Genre: {
      Name: 'Horror',
      Description: 'Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs. Cinematic techniques used in horror films have been shown to provoke psychological reactions in an audience.'
    },
    Decription: 'A couple travels to Northern Europe to visit a rural hometown\'s fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.',
    Stars: [
      'Florence Pugh',
      'Jack Reynor',
      'Vilhelm Blomgren'
    ]
  },
  {
    Title: 'Get Out',
    Director: {
      Name: 'Jordan Peele',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: 'Jordan Peele',
    Year: 2017,
    Genre: {
      Name: 'Horror',
      Description: 'Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs. Cinematic techniques used in horror films have been shown to provoke psychological reactions in an audience.'
    },
    Decription: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    Stars: [
      'Daniel Kaluuya',
      'Allison Williams',
      'Bradley Whitford'
    ]
  },
  {
    Title: 'The Little Mermaid',
    Director: {
      Name: 'John Musker',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: [
      'John Musker',
      'Ron Clements',
      'Hans Christian Andersen'
    ],
    Year: 1989,
    Genre: {
      Name: 'Animation',
      Description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI).'
    },
    Decription: 'A mermaid princess makes a Faustian bargain in an attempt to become human and win a prince\'s love.',
    Stars: [
      'Jodi Benson (voice)',
      'Samuel E. Wright (voice)',
      'Rene Auberjonois(voice)'
    ]
  },
  {
    Title: 'The Lobster',
    Director: {
      Name: 'Yorgos Lanthimos',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: [
      'Yorgos Lanthimos',
      'Efthymis Filippou'
    ],
    year: 2015,
    Genre: {
      Name: 'Drama',
      Description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
    },
    Decription: 'In a dystopian near future, according to the laws of The City, single people are taken to The Hotel, where they are obliged to find a romantic partner in 45 days or they\'re transformed into beasts and sent off into The Woods.',
    Stars: [
      'Colin Farrell',
      'Rachel Weisz',
      'Jessica Barden'
    ]
  },
  {
    Title: 'Pappa Ante Portas',
    Director: {
      Name: 'Vicco von B&uuml;low',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: 'Vicco von B&uuml;low',
    Year: 1991,
    Genre: {
      Name: 'Comedy',
      Description: 'Comedy films are " make \'em laugh" films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters.'
    },
    Decription: 'After ordering enough typewriting paper for 40 years, just to get discount, Heinrich Lohse is forced to retire. The former manager has plenty of time now to spend with his wife and their 16 year old son. But - do they want that?',
    Stars: [
      'Loriot',
      'Evelyn Hamann',
      'Irm Herrmann'
    ]
  },
  {
    Title: 'The Neon Demon',
    Director: {
      Name: 'Nicolas Winding Refn',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: [
      'Nicolas Winding Refn',
      'Mary Laws',
      'Polly Stenham'
    ],
    Year: 2016,
    Genre: {
      Name: 'Horror',
      Description: 'Horror films often explore dark subject matter and may deal with transgressive topics or themes. Broad elements include monsters, apocalyptic events, and religious or folk beliefs. Cinematic techniques used in horror films have been shown to provoke psychological reactions in an audience.'
    },
    Decription: 'An aspiring model, Jesse, is new to Los Angeles. However, her beauty and youth, which generate intense fascination and jealousy within the fashion industry, may prove themselves sinister.',
    Stars: [
      'Elle Fanning',
      'Christina Hendricks',
      'Keanu Reeves'
    ]
  },
  {
    Title: 'Up',
    Director: {
      Name: 'Pete Docter',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: [
      'Pete Docter',
      'Bob Peterson',
      'Tom McCarthy'
    ],
    Year: 2009,
    Genre: {
      Name: 'Animation',
      Description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery (CGI).'
    },
    Decription: '78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.',
    Stars: [
      'Edward Asner (voice)',
      'Jordan Nagai (voice)',
      'John Ratzenberger (voice)'
    ]
  },
  {
    Title: 'Lost In Translation',
    Director: {
      Name: 'Sofia Coppola',
      Bio: 'Movie Director',
      Birth: 1900
    },
    Writers: 'Sofia Coppola',
    Year: 2003,
    Genre: {
      Name: 'Drama',
      Description: 'The drama genre features stories with high stakes and a lot of conflicts. They\'re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.'
    },
    Decription: 'A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.',
    Stars: [
      'Bill Murray',
      'Scarlett Johansson',
      'Giovanni Ribisi'
    ]
  }
];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my Movie database');
});

// ----------------------- Movie endpoints -----------------------

// Gets the list of data about all movies
// GET the list of data about all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Gets data about a single movie by title
// GET data about a single movie by title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('Movie is not in the database.');
    res.status(400).send('Movie could not be found.');
  }
});

// Gets data about a genre by name
// GET data about a genre by name
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Movie is not in the database.');
    res.status(400).send('Genre could not be found.');
  }
});

// Gets data about a director by name
// GET data about a director by name
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('Movie is not in the database.');
    res.status(400).send('Director could not be found.');
  }
});

// ----------------------- User endpoints -----------------------

// GET the list of all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST data creating a new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('User needs a name!')
  }
});

// PUT data updating a user's name by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user = updatedUser.name;
    res.status(200).json(user);
    // res.send('User name has been updated successfully');
  } else {
    res.status(400).send('User could not be found.');
  }
});

// PUT data adding a user's favourite movie to a list
app.put('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favouriteMovies.push(movieTitle);
    res.status(200).send(`"${movieTitle}" has been successfully added to the user ${id}'s' list.`);
  } else {
    res.status(400).send('User could not be found. The movie could not be added.');
  }
});

// DELETE data removing a user's favourite movie from the list
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favouriteMovies = user.favouriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`"${movieTitle}" has been successfully removed from the user ${id}'s list.`);
  } else {
    res.status(400).send('User could not be found.');
  }
});

// DELETE data removing a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`User with ID ${id} has been successfully removed.`);
  } else {
    res.status(400).send('User could not be found.');
  }
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