interface data {
  lat: number, 
  lon: number, 
  lang?: string,
  key: string
}

const getWeather = async ({lat, lon, lang = 'vi', key}: data) => {
  try {

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    });

    const resJSON = await res.json()

    if (res.ok) 
      return resJSON
    else {
      throw { message: resJSON.message }
    }

  } catch (err) {
    throw err
  }
}

export {
  getWeather
}