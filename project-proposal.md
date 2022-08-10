# Rick and Morty Insider Mobile App
Aayushi Gupta (aayushi3) | Moderator: Akhil Isanaka (isanaka2)

## Abstract
### Project Purpose
Create a mobile app that displays and visualizes analytics on the show, Rick and Morty's characters, locations, and
episodes using the Rick and Morty API. The data includes hundreds of characters, images, locations and episodes.

### Project Motivation
Rick and Morty is a popular American adult animated science fiction sitcom about Rick, a mad scientist who drags his
grandson, Morty, on crazy sci-fi adventures. I am interested in using the GraphQL API to help fans of the show get the
inside scoop of the characters, locations, and episodes with an intuitive mobile application. Visualizing the data will
provide users with interesting insights on their favorite show.

## Technical Specification
- Platform: Cross-platform app (React Native)
- Programming Languages: JavaScript
- Stylistic Conventions: JavaScript Style Guide
- SDK: Facebook SDK for React Native
- IDE: IntelliJ
- Tools: React Native, D3.js, p5.js, Rick and Morty API
- Interfaces: Mobile devices
- Target Audience: Rick and Morty fans

## Functional Specification
### Features

- User can view characters from the show in a feed format
- User can click on a character to view a detailed character card
- User can click on a location to view more details and list of residents
- User can click on an episode to view more details and list of characters
- User can see a visualization of the popularity of different characters in a range of episodes
  - User can input the range of episodes
- User can search for character, episode, or location
  - User can select character, episode, or location to view more details


### Scope of the project
- Limitations include not being able to create a complex visualization
- Assumptions include user is familiar with Rick and Morty

## Brief Timeline
Week 1

- Sketch out and design the application
- Identify the data and queries required
- Write classes to parse the query responses


Week 2

- Build a “Component” for each screen designed from week 1
- Create an OAuth token
- Connect to the Rick and Morty API
- User can search for character, episode, or location

Week 3

- User can input range of episodes to analyze
- User can click on character, episode, or location to view more details

Week 4

- Frontend can visualize the popularity of characters
- In the search tab, user can click on results to view more details


## Rubrics
### Week 1
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Setup React App |  2  |  0 pt: Didn’t implement anything <br> +2 pts for properly set up React App |
|  Layout Design |  3  |  0 pt: Didn’t implement anything <br> +2 pts for presenting diagrams/drawings of app design <br> +1 pt for being committed to GitLab |
|  Queries |  6  |  0 pt: Didn’t implement anything <br> +1 pt for creating character list query <br> +1 pt for creating detailed character query <br> +1 pt for creating detailed location query <br> +1 pt for creating detailed episode query <br> +0.5 pt for creating visualization query <br> +1.5 pt for creating seach query |
|  Model Classes |  4  |  -3 pts if JSON object used directly as a model <br> -1 pt if no clean separation of parsing request into the data class <br> -1 pt if no handling of errors |
|  Unit Tests |  5  |  0 pt: No unit tests <br> for every unit test, gain 1 points |
|  Manual Test Plan |  5  |  0 pt: No manual tests <br> for every manual test, gain 1 points |

https://docs.google.com/spreadsheets/d/1O9EeB8k5l-JHu19Z_RDVEvD5ZG69vAYKysaj8R5--1w/edit?usp=sharing

### Week 2
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Fetching Data from API |  2  |  -1 pt if OAuth token committed to git |
|  Create Components |  5  |  +1 pt: Characters view is implemented <br> +1 pt Detailed character view is implemented <br> +1 pt Detailed location view is implemented <br> +1 pt Detailed episode view is implemented <br> +1 pt Search view is implemented  |
|  View Layer |  5  |  +2 pt: Navigation between screens <br> +1 pt: Clean separation between model and view <br> +1 pt: Loading views implemented <br> +1 pt: Error handling views implemented |
|  Search |  3  |  +2 pts: User can search for character, episode, or location <br> +1 pt: Form to conduct search is created |
|  Unit Tests |  5  |  0 pt: No unit tests <br> for every unit test, gain 1 points |
|  Manual Test Plan |  5  |  0 pt: No manual tests <br> for every manual test, gain 1 points |

https://docs.google.com/spreadsheets/d/1PgHaseP5J_EF2c1BM_p9jb0RxFa9hahVvxbwAaJiRxI/edit?usp=sharing

### Week 3
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Popular Characters |  3  |  +3 pts: User can input range of episodes to analyze  |
|  Select Character |  3  |  +3 pts: User can select which character to view more details on  |
|  Select Episode |  3  |  +3 pts: User can select which episode to view more details on |
|  Select Location |  3  |  +3 pts: User can select which location to view more details on  |
|  Navigation Between Screens |  3  |  +1 pt: able to navigate between screens <br> +2 pt: able to go back to the previous page by pressing the back button |
|  Unit Tests |  5  |  0 pt: No unit tests <br> for every unit test, gain 1 points |
|  Manual Test Plan |  5  |  0 pt: No manual tests <br> for every manual test, gain 1 points |

https://docs.google.com/spreadsheets/d/1t-Zu-TbLVrrND0lQtOyD4Oyh9Bsf0MmzjAb7quci51M/edit?usp=sharing

### Week 4
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Popular Character Visualization |  5  |  -2 pt for no interactivity <br> -1 pt for not in a separate route <br> -1 pt for not using visualization library |
|  Search Functionality |  5  |  +1.5 pt: User can select which character to view more details on <br> +1.5 pt: User can select which episode to view more details on   <br> +1.5 pt: User can select which location to view more details on <br> +0.5 pt: User can go back and conduct another search |
|  Attractive Webpage |  2  | +2 pts: Attractive screens  |
|  Responsive Layout |  3  | +2 pts: Supports orientation change <br> +1 pt: Accommodate for specified screen sizes  |
|  Unit Tests |  5  |  0 pt: No unit tests <br> for every unit test, gain 1 points |
|  Manual Test Plan |  5  |  0 pt: No manual tests <br> for every manual test, gain 1 points |

https://docs.google.com/spreadsheets/d/1WnBMJeO4CRwWS9QBzxmS1hfE4Hrzr-Yoe-sbH48vekc/edit?usp=sharing
