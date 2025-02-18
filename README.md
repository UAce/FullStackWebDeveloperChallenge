# Full Stack Web Developer Challenge

## How to run the Search Engine

Start the backend server
```
cd backend
npm run dev
```

Start the frontend client
```
cd frontend
npm start
```

## How to run the tests

Backend server test
```
cd backend
npm run test
```

Frontend client test
```
cd frontend
npm run test -- --watchAll
```

## Assumptions
* User will only search a single word at a time
* The search only returns words similar to the queried word and will not return the word itself
* For simplicity, the backend data isn't persisted and is using in-cache memory instead of a database

## Improvements
* Use a noSQL database to persist the server data
* Use Redux for global state management

## Task Description
Your task for this challenge is to create a small search engine comprising of two parts, a web-based user interface and a server component that exposes a REST API which provides search results retrieved from a corpus of text that will be provided to you in `corpus/hemingway.txt`.

Your submission will be evaluated for conforming to the specifications outlined below as well as code quality (maintainability, scalability, performance etc.). You are permitted to use any resources and libraries you wish, however, you should be able to justify design choices in your code.


## Requirements
The basic search engine should be capable of the following three operations.

1. Given a query consisting of a single word, display the 3 most similar words in the search corpus according to some similarity metric of your choosing.
2. Given a single word `w`, update the search corpus with `w`. The new word `w` should immediately be 
queryable.
3. Given a single word `w`, remove **_the most similar word_** to `w` in the corpus from further search results. 
### User Interface
The user interface should be a browser-based application developed using your JavaScript web framework of choice. It should support the three aforementioned operations. How this is done is completely up to you. Use your creativity and imagination to create a UI that will set your submission apart!

### REST API
The REST API can be implemented using whatever language and frameworks of your choosing. Again, like the UI, it needs to support the three operations listed above. How you choose to accomplish this task is up to you.

## Deliverables
To submit your challenge, fork this repository and provide the link to your forked repository.
You should also update this README to include instructions on how to run your search engine.
Tests are not mandatory but will be considered bonus points if you provide them.

This challenge should take a day at most. It is not expected to be a production ready application and thus will not be evaluated in such a context.
