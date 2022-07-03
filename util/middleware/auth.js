exports.auth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    } else {
        return res.redirect("/login")
    }
}

exports.isNotAuth = (req, res, next) => {
    if(req.user){
        res.redirect("/dash")
    } else {
       next()
    }
}