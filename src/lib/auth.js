module.exports = {
    isLoggedIn (req, res, next) {
      //verifica si el usuario está logueado
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },
    
    isNotLoggedIn(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      return res.redirect('/profile');
    }
      
  
};