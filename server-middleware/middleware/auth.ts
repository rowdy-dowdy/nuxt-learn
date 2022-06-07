import { verifyToken } from '../utils/jwt'
import { responseError } from '../utils/response';

const auth = async (req, res, next) => {
  try {
    const token = req.body.token || req.query.token || req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).send(responseError({
        status: 403,
        text: 'A token is required for authentication'
      }));
    }

    const decoded = await verifyToken(token);
    req.user = decoded;

  } catch (error) {
    return res.status(401).send(responseError({
      status: 401,
      text: 'Invalid Token'
    }));
  }
  return next();
};

export default auth