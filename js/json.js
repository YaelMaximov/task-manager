    /**
     * JSON format:
     * 1. List of users [ users = []  ] called users
     * 2. List of users' info called usersInfo
     *  \(￣︶￣*\)) SINGLE USER FORMAT: (*￣3￣)╭ 
     * objUser = {
     * username:
     * email:
     * password:
     * todo: [
     *          {
     *              idTodo: NaN 
     *              title: ""
     *              status: ["Defined", "In Progress", "Done"] 
     *              date: "YYYY-MM-DD"
     *              comments: ""
     *          }, 
     *       ]
     * todoLen: Number
     * }
     * 3. currentUser: username
     */

    /**
     * Send GET:
     * - when the user sign-up
     * - When user sign in
     * - Filtering:
     *      1. By date (today)
     *      2. By "status" --- ψ(._. )> (maybe)
     * 
     * Send POST:
     * - Adding a todo
     * - User Sign Up:
     *      1. if username is not already in DB:
     *          a. GET from DB all username info  
     *          b. post (add) new (empty) user to DB
     *      2. else:
     *          a. currentUser will be this user
     *          b. Get all his todo list 
     * 
     * Send PUT:
     * - Edits:
     *      1. Status
     *      2. title --- ψ(._. )> (maybe)
     *      3. comments --- ψ(._. )> (maybe)
     * 
     * Send DELETE:
     * - User (current) deletes task
     */

    /**
     * DB:
     * props:
     * - usernames: list(username)
     * - users: list(user)
     * if usernames.length != users.length:
     *      usernames.append(users.end())
     */
    
    // (╬▔皿▔)╯