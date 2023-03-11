# NASA Mars Rover Photos

This project is a web application that allows users to access photos taken by NASA's Curiosity, Opportunity, and Spirit rovers on Mars. The application uses the NASA API to collect image data and make it easily accessible to developers, educators, and citizen scientists.

## Features
- Select a mission, camera, and date to view a collection of photos taken on that day.
- View information about the spacecraft and rovers launched by NASA.
- Save favorite photos to the database for future use.
- Edit mode for managing saved data, including deleting individual items and resetting the list.
- Carousel mode for displaying saved images automatically.
- User registration and login for accessing full site capabilities.
- Real-time updates for the most current information.
- Passwords are encrypted using bcrypt.
- SQLITE is used as the database to store users and images.
- SQL queries are used for database access.
- Dynamic updating of the camera list based on the selected mission.
- All photos and gifs are stored in the project's files to ensure proper loading.
- User requests to the database are verified by their assigned token.
- Appropriate error messages are displayed for unexpected errors.

## Usage
To use the application, follow these steps:

1. Register for an account using a valid email address.
2. Log in with your email and password.
3. Select a mission, camera, and date to view a collection of photos.
4. Save favorite photos to the database for future use.
5. Use edit mode to manage saved data.
6. Use carousel mode to display saved images automatically.

## API Reference
NASA API used in this project. Each rover has its own set of photos stored in the database, which can be queried separately. Photos are organized by the sol (Martian rotation or day) on which they were taken, counting up from the rover's landing date. A photo taken on Curiosity's 1000th Martian sol exploring Mars, for example, will have a sol attribute of 1000. Results can also be filtered by the camera with which the photo was taken, and responses are limited to 25 photos per call. Queries that should return more than 25 photos are split onto several pages, which can be accessed by adding a 'page' parameter to the query.

## Technologies Used
This project was built using the following technologies:

- HTML/CSS/JavaScript
- Node.js
- Express.js
- SQLITE
- bcrypt

## Contributors
This project was created by [Your Name] and [Partner Name], as part of [Course Name]. We welcome contributions from other developers to improve this project.

## License
This project is licensed under the Hadassa College License.
