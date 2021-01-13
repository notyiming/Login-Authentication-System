let authUser = (req, res, next) => {
    if (req.user == null) {
        res.status(401);
        res.render('../views/pages/unauthorized', {pageTitle:'Unauthorized'});
    } else
        next();
}

let authRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(403);
            res.render('../views/pages/forbidden', {pageTitle:'Forbidden'});
        } else
            next();
    }
}

module.exports = {
    authUser,
    authRole
}