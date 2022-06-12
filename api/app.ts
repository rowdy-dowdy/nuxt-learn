const getLocation = async (options: Object | undefined = undefined) => {
  try {
    const location: Promise<GeolocationPosition> = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    });

    const coords = (await location).coords

    return {
      lat: coords.latitude,
      lon: coords.longitude
    }

  } catch (err) {
    throw err
  }
}

export {
  getLocation
}