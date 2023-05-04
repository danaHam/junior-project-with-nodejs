const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>
 { 
    if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  // Bearer 
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    // Verify the token is valid
     jwt.verify(token, "maintance tiketing System",(err, decodedToken) => {
///from auth i can access to id i can named created by 
        if (err) {
            console.log(err.message);
                  } else {
          console.log(decodedToken);
          next();
        }
      });
     
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
  };

  module.exports = {
    verifyToken
  };