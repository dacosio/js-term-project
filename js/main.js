// alert("connected");
// ****************************************************************************
// ****************************************************************************
//
//          Final Exam
//
//  Instructions:
//      Make sure to always provide meaningful feedback to the user
//          (not just the name or number, talk to the user as if they are
//           standing in front of you)
//
//      Preload the Movie Object with Data from TMDB (1 page of trending movies)
//
//      Section 1 should allow the user to add as many movies and showtimes as they want
//
//      Section 2 should allow the user to scroll through movies and showtimes
//              let the user click the Pick Movie button to populate Section 3
//
//      Section 3 should allow the user to buy a ticket for a movie/showtime
//          Section 3 requires:
//              you to get the movie from the user
//              you to get the showtime from the user
//              you to get the number of tickets from the user
//              use the movie and showtime to get the ticket price
//                  (remember that diff showtimes may have diff costs)
//                  (also, for this exercise, there are no discount seats)
//
//              calculate the total price as:
// ****************************************************************************
//  ===============> (ticket price * number of tickets * 1.15 (to add tax))
// ****************************************************************************
//              Display this amount back to the user in a meaningful way
//
// ****************************************************************************

// ****************************************************************************
// ****************************************************************************
// ****************************************************************************

// ****************************************************************************
//      Start of Program
// ****************************************************************************
// ****************************************************************************
//          Variable Declarations
// ****************************************************************************
// ****************************************************************************
//  Full-Scope Variables
let movieObjectsArray = [];
let currentIndex = 0;
let moviePrice = 0;
const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = "2b8ae5af818b4145f34d48e0264179f9";
const movieTrending = `${baseUrl}trending/movie/week?api_key=${apiKey}`;

// ****************************************************************************
//  Pull Movies from API and Load the Movie Array
//
//  Show times are base on rating:
//      movies with ratings of at least 4 will be shown at 11am
//      movies with ratings of at least 6 will be shown at 11am and 2pm
//      movies with ratings of at least 7 will be shown at 11am, 2pm, and 5pm
//      movies with ratings above 8 will be shown at 11am, 2pm, 5pm, and 8pm
//
//  Prices:
//      11am - $4.99
//      2pm - $6.99
//      5pm - $8.99
//      8pm - $11.99
//
//  Grades:
//      option 1: Load movie and times via a switch statement with fall-through - max 100% for section
//      option 2: Load movie and times via a switch statement - max 90% for section
//      option 3: Load movie and times via an if-statement - max 80% for section
//
//      For example:
//          if you get 8/10 on the section and you implemented option 1 you get 8 marks
//          if you get 8/10 on the section and you implemented option 2 you get 7 marks
//          if you get 8/10 on the section and you implemented option 3 you get 6.5 marks
//
//      Sample Object:
//          const movieObj = {
//              movieName: title,
//              showtime: showtime,
//              price: price
//          }
//
// ****************************************************************************
// Populate the Movie Table - 10 marks

const movieRatingFilter = (ratingLeft, ratingRight, movies) => {
  if (ratingLeft == 0) {
    return movies.filter((movie) => movie.vote_average > 8);
  }
  return movies.filter(
    (movie) =>
      movie.vote_average >= ratingLeft && movie.vote_average < ratingRight
  );
};

const selectShowTimes = (movies) => {
  const eleven = "11am";
  const two = "2pm";
  const five = "5pm";
  const eight = "8pm";

  let results = [];
  const atLeastFour = movieRatingFilter(4, 6, movies);
  const atLeastSix = movieRatingFilter(6, 7, movies);
  const atLeastSeven = movieRatingFilter(7, 8, movies);

  const moreThanEight = movieRatingFilter(0, 8, movies);
  if (atLeastFour.length > 0) {
    results = [
      ...results,
      ...atLeastFour.map((four) => {
        return {
          movieName: four.title,
          showtime: eleven,
          price: 4.99,
        };
      }),
    ];
  }
  if (atLeastSix.length > 0) {
    let counter = 1;
    let showtime = "11am";
    let price = 4.99;
    while (counter != 3) {
      results = [
        ...results,
        ...atLeastSix.map((six) => {
          return {
            movieName: six.title,
            showtime,
            price,
          };
        }),
      ];
      counter++;
      showtime = "2pm";
      price = 6.99;
    }
  }

  if (atLeastSeven.length > 0) {
    let counter = 1;
    let showtime = "11am";
    let price = 4.99;
    while (counter != 4) {
      results = [
        ...results,
        ...atLeastSeven.map((seven) => {
          return {
            movieName: seven.title,
            showtime,
            price,
          };
        }),
      ];
      counter++;
      if (showtime == "11am") {
        showtime = "2pm";
        price = 6.99;
      } else if (showtime == "2pm") {
        showtime = "5pm";
        price = 8.99;
      }
    }
  }
  if (moreThanEight.length > 0) {
    let counter = 1;
    let showtime = "11am";
    let price = 4.99;
    while (counter != 5) {
      results = [
        ...results,
        ...moreThanEight.map((eight) => {
          return {
            movieName: eight.title,
            showtime,
            price,
          };
        }),
      ];
      counter++;
      if (showtime == "11am") {
        showtime = "2pm";
        price = 6.99;
      } else if (showtime == "2pm") {
        showtime = "5pm";
        price = 8.99;
      } else if (showtime == "5pm") {
        showtime = "8pm";
        price = 11.99;
      }
    }
  }
  return results;
};

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  movieObjectsArray = selectShowTimes(data.results);
  console.log(movieObjectsArray);
};

getMovies(movieTrending);

// ****************************************************************************
// ****************************************************************************
//  Function Variables

// ****************************************************************************
// ****************************************************************************
//      Event Listeners
// ****************************************************************************
// ****************************************************************************
//  Load Movie Array - 10 marks
addMovie.addEventListener("click", () => {});

// ****************************************************************************
// ****************************************************************************
//  View the Available Movies - 5 marks
load.addEventListener("click", () => {});

// ****************************************************************************
// ****************************************************************************
//  Navigate through the Showtimes - 5 marks each (so 15 marks for this section)
next.addEventListener("click", () => {});

prev.addEventListener("click", () => {});

pickMovie.addEventListener("click", () => {});

// ****************************************************************************
// ****************************************************************************
//  Calculate Ticket Price - 10 marks
calcTotal.addEventListener("click", () => {});
