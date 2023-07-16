# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Documentation about the ui part of the project:

State Variables 
todos: An array that holds the todo items fetched from the API. 
newTodo: A string that represents the content of the new todo item being entered in the input field. 
radio: A string that represents the selected filter option for displaying todos ("All", "Completed", or "Pending"). 
editTodoId: A string that stores the ID of the todo item being edited. 

API Configuration 
api: An Axios instance created with the base URL set to "http://localhost:9999/api/". This instance will be used to make HTTP requests to the backend API. 

useEffect
The useEffect hook is used to fetch todos from the API when the component is first rendered. It calls the fetchTodos function, which makes a GET request to the "todos" endpoint and updates the todos state variable with the response data.

Event Handlers
handleInputChange: Updates the newTodo state variable with the value entered in the input field. 
handleRadio: Updates the radio state variable with the selected filter option.
handleEditButtonClick: Sets the newTodo state variable to the content of the todo item being edited and updates the editTodoId state variable with the ID of the todo item.

API Requests 
fetchTodos: Makes a GET request to the "todos" endpoint and updates the todos state variable with the response data. 
createTodo: Makes a POST request to the "todos" endpoint with the content of the new todo item and adds the returned todo item to the todos state variable. 
updateTodo: Makes a PUT request to the endpoint specific to the todo item being edited, updates the content of the todo item, and fetches the updated todos. 
deleteTodo: Makes a DELETE request to the endpoint specific to the todo item being deleted and removes the item from the todos state variable. 
toggleComplete: Makes a PUT request to the endpoint specific to the todo item being toggled, updates the completed status of the todo item, and updates the todos state variable accordingly. 

Displaying Todos 
The displayTodos variable filters the todos based on the selected filter option (radio) and maps each todo item to a JSX element. It displays the content, delete button, edit button, and a checkbox to toggle the completion status of each todo item.

Features

Create a new todo item by entering the content in the input field and clicking "Add Todo".
Update an existing todo item by selecting the item to edit, modifying the content, and clicking "Update Todo".
Delete a todo item by clicking the "Delete" button next to it.
Toggle the completion status of a todo item by clicking the checkbox next to it.
Filter todos based on their completion status using the radio buttons.
Retrieve the list of todos from a RESTful API backend.
Display the list of todos with their content, completion status, and action buttons.

Dependencies

The TodoApp component depends on the following packages:
react: JavaScript library for building user interfaces.
axios: Promise-based HTTP client for making API requests.
uuid: Package for generating unique IDs.(we have generated unique id's in the backend, but we can generate here as well ther's an option.


API Documentation

The TodoApp component interacts with the following API endpoints:
GET /api/todos: Retrieves all todos.
POST /api/todos: Creates a new todo.
PUT /api/todos/{id}: Updates a todo by ID.
DELETE /api/todos/{id}: Deletes a todo by ID.

