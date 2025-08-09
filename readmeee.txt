First project set up 
    gitignore
    server.js
    install express
    install nodemon
    change in script (start,dev)

Create a server nd test
    install dotenv
    use it with .config()
    create env
    create basic one api
    check in Thunder Client
    res.send  res.json

Create a Routes folder
    create a contact Route page
    use Router
    <!-- 
    router.route("/").get((req, res) => {
        res.status(200).json({message: 'Get all Contacts'});
    });
    app.use("/api/contact" , require("./routes/contactRoute.js"));
    -->

Create a controller
    In that we made so it get simply route 
    <!-- 
    const getContacts = (req, res) => {
        res.status(200).json({message: 'Get all Contacts'});
    } 
    router.route("/").get(getContacts).post(createContact);
    -->

    send a body param from api Post 
    then we use body parser
    then in controller we have to do error handling

create a middleware
    create a errorMiddleware.js file filter the error nd give more details

then create a mongoDB connction then use that string in .env file
    create a dbConnection.js file in config folder

create models
    create a contactModule where we define the schema
    then in controller we use that model to create a contact

    *** most important part is to use async await in controller
    and use error handler in controller

    myContacts-backend



Authentication
    create a userModule
    create a userController
    create a userRoute

    create a api route for current user , login user , register user
    then in userController we create a all function
    In password fuction we use bcrypt to hash the password
        check all feilds are present
        check if user already exists
        hash the password
        by
        const hashPassword = await bcrypt.hash(password, 10);
            intall npm i bcrypt

    install npm i jsonwebtoken
        in login fuction 
        all feilds required
        find user
        compare password with bcrypt.compare
        then create a token

    for current user
        in route 
            router.get('/current',validateToken, currentUser)
        create a middleware to protect  the route
        validateToken middleware
            check if token is present in header
            verify the token using jsonwebtoken
            then get the user id from token and send the user data
        check if user exists
        then send the user data



create update get delete contact is not done by all user 
so we need to check if the user is authorized to do that
    in contactController.js
        check if user_id in contact is same as req.user.id
        if not then send 403 error

    in userController.js
        check if user_id in user is same as req.user.id
        if not then send 403 error

    then we can use this middleware in all routes where we need to check authorization



    





        