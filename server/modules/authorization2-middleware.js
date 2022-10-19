const rejectUnauthorized2 = (req, res, next) => {
  // check if user level is greater than or equal to that of a research head
  if (req.user.user_level >= 2) {
    // They were authorized! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthorized2 };
