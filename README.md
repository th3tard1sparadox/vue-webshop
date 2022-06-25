# TDDD27_2022_project

Project for the course TDDD27.

## Specifications

These are the specifications the project is based on.

### Functional

The project will be a webshop where you can make group orders. This would include accounts, wishlists, a dynamic shoppingbag which updates whenever another person in the group adds something to the bag, a listing page where you can see the products and some sort of payment solution.

The accounts are planned to be connected to Google, and will use their login. ~~The payment is still not entierly decided how it will be done, but there are some thoughts about using PayPal.~~ The payment will be handeled using Stripe. Stripe has several different tests, so no payments have to be made to ensure that it is working.

### Technological

These are the technological specifications for this project, mainly consisting of the frameworks used.
- **Programing languages** - JavaScript and Python are the main ones that are planned to be used.
- **Client framework** - Vue is the framework that is going to be used as it lands within my experience level.
- **Server framework** - Flask is planned to be used as the backend framework, although Django is the backup plan if it turns out that Flask wasn't the appropriate choice.
- **Other technologies** - Naive UI will be used for frontend design. Although Bootstrap was considered it doesn't currently support vue 3, which is why Naive UI was chosen instead.

## Usage

*This is just to get the project started running.*

### mprocs

To run this project easily I used the program called [mprocs](https://github.com/pvolok/mprocs). To use it you simply run the command:

    mprocs

in the home folder and the site should be up and running on localhost:3000, with the backend interface on localhost:5000.

### Dependencies

The dependencies for this project are not available in any file, but most of them can be found below (from memory, so some things might be missing):
- vue
    - vue-router
    - vuex
    - naive-ui
    - vue-socket.io-extended
    - vue-stripe
- flask
    - SQLAlchemy
    - stripe
    - flask_cors
    - flask_jwt_extended
    - flask_socketio
- mprocs
- venv
