# AthleteDB

## MERN Stack playground to code basic CRUD functionality.

### AthleteDB keeps track of athletes and their athletic training progress. 

### User Stories

1. A user can register themselves and access the site.
2. A user can add an athlete with a name, address, birthday, and profile image.
3. A user can add training sessions to each athlete with type of session, duration, and notes. 
4. A user can search for athletes based on the first name of the athlete. 
5. A user can delete and update an athlete and related sessions.

### Notes

Profile images were initially uploaded using Google Firebase Storage, but this ability will be disabled when the project is published. AthleteDB uses MongoDB for most database actions, and without full Firebase integration, I cannot adequately secure my interactions with Firebase Storage. 

User authentication and protected routes are accomplished with JSON web tokens. 

Improved code organization with increased separation of concerns in React, with API calls in separate JS 'service' files, and components, modals, and pages in separate folders. 

### Future Improvements

1. Enable live searching with more than just the first name of the athlete.
2. Add more datapoints for each athlete and training session.
3. Visualize, somehow, training progress over time.
4. Enable profile image uploading with more secure Firebase settings, or possibly AWS S3. 
5. Make registration requirements more robust, and enable some kind of way to reset the password for each user. 
6. Allow for athletes to be separated into groups by sport or coach or other ways. 
