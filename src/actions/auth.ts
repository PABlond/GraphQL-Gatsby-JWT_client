import { navigate } from 'gatsby'

const isBrowser = typeof window !== `undefined`

export const getUser = () => {
    if (isBrowser) {
        return window.localStorage.getItem('pablond-auth')
            ? (window.localStorage.getItem('pablond-auth') as String)
            : ''
    }
    return ''
}

export const setUser = (token: string) => window.localStorage.setItem('pablond-auth', token)

export const handleLogin = (token: string): Boolean => {
    if (!isBrowser) return false

    setUser(token)
    return true
}

export const isLoggedIn = () => {
    if (!isBrowser) return false
    const user = getUser()

    return !!Object.keys(user).length
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = () => {
    window.localStorage.removeItem('pablond-auth')
    navigate('/')
}
