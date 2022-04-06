# TDDD27_2022_project

Project for the course TDDD27.

## Specifications

These are the specifications the project is based on.

### Functional

The project will be a webshop where you can make group orders. This would include accounts, wishlists, a dynamic shoppingbag which updates whenever another person in the group adds something to the bag, a listing page where you can see the products and some sort of payment solution.

The accounts are planned to be connected to Google, and will use their login. The payment is still not entierly decided how it will be done, but there are some thoughts about using PayPal.

### Technological

These are the technological specifications for this project, mainly consisting of the frameworks used.
- **Programing languages** - JavaScript and Python are the main ones that are planned to be used.
- **Client framework** - Vue is the framework that is going to be used as it lands within my experience level.
- **Server framework** - Flask is planned to be used as the backend framework, although Django is the backup plan if it turns out that Flask wasn't the appropriate choice.

## Usage

*This is just to get the project started running.*

### Server

To set up the server, initiate a virtual enviroment in the home folder of the repository using the following command:

    python -m venv env

Then activate the enviroment, this may be different based on what shell you are running it in. When using bash run:

    source env/bin/activate

If you use fish like me, run:

    source env/bin/activate.fish

When the enviroment is active move into the server folder:

    cd server

Then start the server by running:

    python app.py

You can now do a sanity check by visiting localhost:5000/ping in any browser, where you should see "pong".

### Client

To run the client move into the client folder:

    cd client

Then you can run

    npm run dev

Now you may visit localhost:3000/ping in any browser, where you should see the word pong.
