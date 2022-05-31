import jwt from "jsonwebtoken";
const token_key = process.env.TOKEN_KEY;

const verifyToken = async (token) => {
  try {
    const user = await jwt.verify(token, token_key);

    return user

  } catch (err) {
    throw {
      status: 401,
      message: "Invalid Token"
    }
  }
};

const signToken = async (data, time = 3600) => {
  try {
    const token = await jwt.sign({
      id: data.id,
      name: data.name,
      email: data.email
    }, token_key, { expiresIn: time })

    return token

  } catch (err) {
    throw {
      status: 500,
      message: "Not created jwt token"
    }
  }
};

export {
  verifyToken,
  signToken
}