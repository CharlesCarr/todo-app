# To Do App w/ Login

## Tech Stack
- React.js / TypeScript / React Context API (Global State Mgt) / TailwindCSS (efficient styling)
    - NPM Libraries: react-router-dom (routing) / React Hook Form (validation) / uuid (unique ids)
    - Built with Vite: run 'npm i' to install packages and 'npm run dev' to spin up

## Development Process
- Routing with react router dom (two main routes / pages: Login, List)
- Login Page (with form & validation)
    - using React Hook Form lib for ease of use and speed (used lib in prior professional codebase)
    - onSubmit POST request to endpoint for login (fetch API - async / await)
    - React Context API for global state mgt for login status (protecting routes)
        - decided against Redux for this simple use case
- List Page (add list items / filter (search) list items)
    - List Item component (edit / delete functionality)

#### Time Spent
1. Took time before development to review instructions - map out pages and functionality and technology needed for efficient process (why I decided on Vite, npm libs like React Hook Form, TailwindCSS, and Context API)
2. Started with routing - 15 minutes to create structure with protected paths and not found page
3. Login Page - built out form with React Hook Form (1 hr)
4. List Page - decided on array of objects for list with edit boolean value, mapped over list to display and built individual item component then added edit/delete/search functionality (1hr 30 mins)
5. Completed onSubmit function with POST request for Login and added Context API for login state (1 hr 30mins)
6. Styled with TailwindCSS based off theme and fonts from website (30 mins)