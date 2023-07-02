# ts-crud-api
## Getting started
- clone or download repo
- go to project folder
- run ```npm i``` to install dependencies

Value of `port` on which application is running should be stored in `.env` file

## Running
### available commands
- `npm run start build` - builds the app
- `npm run start:dev` - starts the app in dev mode using nodemon
- `npm run start:prod` - builds the app and start bundle
- `npm run start:multi` - starts multiple instances of application
- `npm run lint` - starts linter
- `nom run test` - launches test suites. **Server must be started**

## Usage
Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
___
Implemented endpoint `api/users`:
    - **GET** `api/users` is used to get all persons
        -  **200** and all users records
    - **GET** `api/users/{userId}` 
        -  **200** and record with `id === userId` if it exists
        -  **400** and corresponding message if `userId` is invalid (not `uuid`)
        -  **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        -  **201** and newly created record
        -  **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server should answer with` status code` **200** and updated record
        - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        -  **204** if the record is found and deleted
        -  **400** and corresponding message if `userId` is invalid (not `uuid`)
        -  **404** and corresponding message if record with `id === userId` doesn't exist