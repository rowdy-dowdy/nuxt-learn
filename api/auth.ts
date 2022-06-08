const login = async ({email, password}) => {
  try {
    const res = await fetch(``, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data

  } catch (error) {
    throw error
  }
}

const register = async ({name, email, password}) => {
  try {
    const res = await fetch(``, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data

  } catch (error) {
    throw error
  }
}

const logged = async ({token}) => {
  try {
    const res = await fetch(``, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token, 
      }
    })

    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data

  } catch (error) {
    
  }
}

const logout = async ({token}) => {
  try {
    const res = await fetch(``, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token, 
      }
    })

    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data

  } catch (error) {
    throw error
  }
}

const refresh_token = async () => {
  try {
    const res = await fetch(``, {
      method: 'POST'
    })

    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data

  } catch (error) {
    throw error
  }
}

export {
  login,
  register,
  logged,
  logout,
  refresh_token
}