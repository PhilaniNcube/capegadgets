import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingthaverconfifdenghtboaugfgl',
    {
      expiresIn: '20d',
    },
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingthaverconfifdenghtboaugfgl',
      (err, decode) => {
        if (err) {
          res.status(401).send({ mesage: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      },
    );
  } else {
    res.status(401).send({ mesage: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ mesage: 'No Admin Permissions' });
  }
};
