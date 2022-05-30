import { verifyToken } from '../utils/jwt'

const auth = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

export default auth