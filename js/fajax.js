class FXMLHttpRequest {
    /**
     * JSON format:
     * 1. List of users [ users = []  ]
     * 2.
     *  \(￣︶￣*\)) SINGLE USER FORMAT: (*￣3￣)╭ 
     * objUser = 
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
     * 
     * 3. currentUser: username
     */

    /**
     * Send GET:
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
     *      3. else: 
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
}