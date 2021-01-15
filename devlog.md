# Until now
- the app was created during stages of learning React and following the end of WebDev Bootcamp course from udemy
- had seven useState hooks
- rendered conditionally on the index root, which means refresh will erase the progress of the game

# 15 Jan 2021
- rewrote the code on development-1 branch to simplify the excessive use of State hooks by nesting the variables required
- consider rendering the components on react-router rather than conditionally
- change back the answer function to one-tap without submit button so it's easier to use
- remove lodash dependency and use vanilla JS to transform text 
- fetch country list from module and randomise the order before serving the question
  - previous method: fetch a random country each round, which may cause repeat questions and less efficient