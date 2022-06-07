const responseError = ({status = null, text = null, details = null}) => {
  return {
    data: null,
    error: {
      status: status || 500, // HTTP status
      // name: "", // Strapi error name ('ApplicationError' or 'ValidationError')
      message: text || "Server Error", // A human reable error message
      details: details || []
    }
  }  
}

export {
  responseError
}