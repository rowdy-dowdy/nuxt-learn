import { refresh_token } from './auth'
import { useUserStore } from '~~/store/auth';
const store = useUserStore()

const customFetch = async (callback) => {
  try {
    await callback
  } catch (error) {
    if (error.status == 401) {
      try {
        const token = await refresh_token()

        localStorage.setItem('token', token);
        store.refresh_token(token)

        await callback
        
      } catch (error) {
        store.logout()
      }
    }

    throw error
  }
}

export {
  customFetch
}