# Active Tasks

[Project backEnd Repo:](https://github.com/1001hadi/activeTasks-BE)

# About:

### Active tasks is Task management app let you create and manage your work / life related task and assign it to your employee / family member and monitor their task progress on admin dashboard. In register form admin/ user can upload their profile image. after Create account and sign in Admin can assign task to specific user with priority level, due date, checklist to accomplish and attachment link to resources. Admin can monitor and edit task and reassign to other user if needed. after register and sign in User has his own dashboard and can see the task activity chart and update the task progress only. After user update task checklist checkboxes the progress will be automatically update on admin dashboard and all users if that task assign to them as well.

# Tolls in use =>

- stack:

  - MongoDB
  - Express.js
  - React.js
  - Node.js
  -

- Libraries:
- frontEnd:
  - react-router-dom
  - axios
  - react-icons
  - recharts
  - react-hot-toast
  - moment
  - tailwindcss
- backEnd:

  - express
  - mongoose
  - cors
  - bcryptjs
  - jsonwebtoken
  - dotenv
  - multer

  #

## Build Process =>

1 - Start project and install the necessary packages

- install react-router and needed libraries
- instal tailwind css
- install all needed package and library
  - axios react-router-dom react-icon react-hot-tost moment recharts
- setup folder structures and files
- setup needed routes

2 - start building Components

- building Auth components

  - build login form
  - create layout component
    - hold the login and register page layout
  - create input component
  - handle email validation(regex)
  - handle password & password toggle
  - link login to register page for not registered user

- build register form

  - handle background layout
  - handle register form
    - add input for fullName, email, password and admin invite code
    - handle Profile Image
      - can be in separate component
      - create uploadImg helper
      - handle api call

- build API paths and handle fetch request

  - create API paths for all needed paths
  - handle fetch(with axios)
  - handle storing token in local storage
  - handle errors and redirecting to login page

- create userContext hook for state management

  - create userProvider and fetch user with useEffect
  - import api paths and fetches
  - store token in local storage
  - update the user and keep token
  - clear local storage if logout
  - handle error and test the login

- create Dashboard interface

  - create userAuth hook

    - check if it user display dash, else redirect to login

  - use the hook in admin and user dashboard
    - check users data with json.stringify(if there is data to display!)
  - create Dashboard layout component

    - create navbar component

      - display sidebar menu

    - create sidebar menu
      - display info depending on role (admin or user)
      - display changed or added info depending on role
      - redirect to login page if logout
    - create data file fro side menu to render info
      - create object of data for admin, user, status and priority level
    - import them to sidebar and map the data to display it depending on role(admin or user)

- display dashboard data (tasks, task status, task-priority level)

  - display admin/user name and date when login
  - create info component to display tasks status percentage
    - create separator function to display task numbers
  - display tasks status percentage of (pending, progress, complete)
    - create show status component
    - using rechart library display status chart
    - display the status count
  - display task priority percentage of (low, medium, high)
    - create priority level component
      -using rechart library display priority chart
  - display recent tasks table
    - create taskTable component
    - thead to display(name, status, priority and create date)
    - tbody to display data

- Create task page

  - create function to start create, edit, remove and get task
  - import the data and axiosInstance files
  -
  - create task
    - store current tasks in state
    - create task function
    - add task title
    - add task details
    - assign task to user / can be modal with check box
    - add priority level / can be dropdown menu
    - must have due date
    - add task checklist/ can be multiple
    - add task attachments / link
    - update task / admin only
    - remove task admin only
    - task title, desc, assigned to, due date
    - must have submit BTN
    - handle error

- Create manage task page

  - Display all task
  - display each task with Card
  - only admin can see all tasks
  - only admin can manage edit/remove task
  - edit can be the same as create page
  - task card
    - display task with name, description, due date, status and assigned o(users)
    - display progress bar depend on status
  - task filter between status or priority

- Create manage users page

  - display all users
    - display user on card
    - display user's name, email, how may task they have.
  - admin can remove user

- building user UI

- Create user Dashboard with reusable components

  - display user specific task
  - use all chart and menu components from admin
  - display Progress percentage and priority level
  - display recent task(5)

- create user task page
  - display user specific task
  - use same component from admin management page,
  - add admin filter for task progress
- create user detail page
  - display task detail for user
  - user can update the checklists to start task progress.
  - if task has attached link handle it with https or http
  - task progress will updated if checkbox marked as checked.

# Deployment

- deploy backend and whitelist the DB
- chang the BASE_URL to backed address.
- deploy the frontEnd

#

# Challenges:

- Planing and what i want to put in my App to be done in capstone time window
- Finding Good and functional libraries
- Manage my folder structure to be easy access and clean
- good name for variables, functions, components
- Keep my self focus on building the project.
- Style and choice good colors
- Building Create task route
- Authentication and admin only routes
- Upload profile picture for user/admin
- Create task route controller with needed functionality
- State management
- Display percentage of task progress and priority dynamically
- Misspelling and self made bugs
- Working with Promises and update users tasks and show their progress
- Make my components Reusable for both admin and user
- Make attached link navigating to their website
- Clean code and functionality at the same time
- FrontEnd deployment on render => still working on it.

#

# What i will add if have time:

- Add exact percentage % number on progress and priority
- Add user Edit to admin
- Add 3rd party API to display weather
- Add Download functionality for all tasks report as google sheet
- Work more on UI and CSS
-
