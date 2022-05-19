# SQL Query App
A web application for running SQL queries. A user types in the SQL query in an embedded text editor and receives the query output in an output panel.

## Project Overview 
This is a JavaScript Single-Page Application (SPA) built with Vue.js.

### Framework used, plugins, and packages 
- Javascript Framework - [Vue.js 2](https://v2.vuejs.org/)
- Styling library - [TailwindCSS](https://tailwindcss.com/)
- Notifications/alerts - [Vue Toasted](https://www.npmjs.com/package/vue-toasted)
- In-browser Editor - [Ace](https://ace.c9.io/)

###  Page load time of application
Chrome Lighthouse test gave a 0.8 seconds load time.

![Chrome test image](https://user-images.githubusercontent.com/44481619/169245306-59a14bdc-7d7e-445d-8ccf-d12a1afddfab.png)

[Pingdom Website Speed Test tool](https://tools.pingdom.com/) calculated the page load time as 0.2 seconds.

![Pingdom test image](https://user-images.githubusercontent.com/44481619/169245294-8d09f667-8bfb-429c-9d27-18ecb457f86e.png)

## Installation
The application uses NPM for dependency management. You need to have [Node v12 or greater](https://nodejs.org/en/) and [NPM v6 or greater](https://nodejs.org/en/) to run the application locally. Follow the steps below to install locally:

### Step 1: Clone the repository

```bash
git clone https://github.com/vinuch/sql-query-app.git
```

### Step 2: Change directory into the project

```bash
cd sql-query-app
```

### Step 3: Install dependencies

```bash
yarn
```

### Step 4: Start the development server

```bash
yarn serve
```

This should start the development server on http://localhost:3000

## Deploying the Application
You can deploy the app to [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com), or any other deployment service that supports Node.js. If you want to test the built application before deployment, run the following command:

```bash
yarn build
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
