# React Flashcards App

This is a remake of my Simple Flashcards Page [link](https://github.com/owaruuu/FlashcardsPage) now made using React, it includes account creation and a database connection through a backend that connects to AWS's Cognito and DynamoDB to keep track of user progress, if any of the 3 services is out the user is served a basic version without progress tracking.

## Table of contents

-   [Overview](#overview)
    -   [Keypoints](#Keypoints)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
-   [Author](#author)

## Overview

### Keypoints

-   React stateful app
-   useContext and useReducer for various global states
-   AWS Cognito for user accounts
-   AWS DynamoDB for user progress database
-   Express.js backend
-   Mobile responsive

### Screenshot

![](./assets/screenshots/siteref3.jpg)

### Links

-   Live Site URL: [Live site](https://owaruuu.github.io/ReactFlashcards/)
-   Simple Vanilla Site: [Live site](https://owaruuu.github.io/FlashcardsPage/)

### Built with

-   React.js
-   Axios
-   Express.js (hosted in another project)
-   AWS SDK
-   Semantic HTML5 markup
-   CSS custom properties
-   Flexbox and grid
-   Mobile-first workflow
-   [Sass](https://sass-lang.com) - CSS Extension
-   [Bootstrap](https://getbootstrap.com) - Frontend Framework

### What I learned

-   How to use useContext and useReducer to have global states through a Provider
    Code snippet:

```html
export const AppContext = createContext();
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    return (
        <AppContext.Provider
            value={{
                init: state.init,
                cognitoError: state.cognitoError,
                cognito: state.cognito,
                serverError: state.serverError,
                loaded: state.loaded,
                loggedIn: state.loggedIn,
                user: state.user,
                appState: state.appState,
                needToSave: state.needToSave,
                dbError: state.dbError,
                dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
```

## Author

-   Linkedin - [Josue Marquez](https://www.linkedin.com/in/josuemarquez/)
