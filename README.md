# Movie Explorer App

## Project Story
A responsive web application that allows users to search for movies, view details, and discover trending films. The app fetches real-time data from the TMDb API.

## Features Implemented
* **User Interface:** Mock User Login, Search bar, Grid of movie posters, Trending movies section, Detailed view (overview, genre, cast, YouTube trailer), and Light/Dark mode.
* **API Integration:** Integration with TMDb API using Axios to fetch trending movies, search results, and movie details. Implemented a "Load More" button for pagination.
* **State Management:** Used React Context API for global state management and `localStorage` to persist the user's login state, last searched movie, and favorite movies list.
* **Bonus Features:** Filter movies by Minimum Rating and Year.

## Technologies Used
* React (Create React App)
* Material-UI (MUI) for styling and responsive design
* Axios for API requests
* React Router DOM for navigation

## Setup Instructions
1. Clone the repository:
   `git clone <your-gitlab-repo-url>`
2. Navigate to the project directory:
   `cd movie-explorer`
3. Install the dependencies:
   `npm install`
4. Start the development server:
   `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.