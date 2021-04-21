# rap-names-express

## Install all the dependencies

- Clone your forked repository
    ```
    git clone https://github.com/USERNAME/rap-names-express.git
    cd rap-names-express
    ```
- Install all the dependencies
    ```
    npm install
    ```

## Set up MongoDB

1. Go to your MongoDB account

2. Create a new project and build a new cluster inside this project

3. Choose the free cluster and make sure that M0 sandbox is selected in the next page

4. After the cluster is created, click CONNECT

5. Add your current IP address (Don't forget to select Add IP Address button)

6. Create your Username and Password for you API to access the database

7. Click Choose a connection and select Connect to your application

8. Copy your connection string

9. Go to your .env file inside the rap-names-express folder and replace the connection string with your string

10. Don't forget to replace `<password>` with your password

![Gif in a nutshell](https://user-images.githubusercontent.com/51871665/115613175-f099a400-a2a0-11eb-8f75-b80db13d85df.gif)

## Run locally

- Start the server with 
    ```
    node server
    ```
- Visit your app at http://localhost:2121


## Demo

- What you'll see

https://user-images.githubusercontent.com/51871665/115613285-1161f980-a2a1-11eb-9e82-1ab6807240c3.mov


