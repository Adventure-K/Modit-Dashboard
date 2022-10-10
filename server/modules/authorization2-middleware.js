const rejectUnauthorized2 = (req, res, next) => {
  // check if logged in
  if (req.user.user_level >= 2) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthorized2 };
