import React from 'react'
import queryString from 'query-string'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Loading from './../../components/Loading'

const USER_CONFIRM = gql`
    query UserConfim($uniqid: String, $email: String) {
        userConfirm(uniqid: $uniqid, email: $email) 
    }
`

export default ({ location }: any) => {
    const { uniqid, email } = queryString.parse(location.search)
    console.log({ uniqid, email })

    const { loading, error, data } = useQuery(USER_CONFIRM, {
        variables: { uniqid, email },
    })

    if (error) console.log(error)

    return !loading ? (
        data ? (
            <p>Your account is now active, please <a href="/login">login</a></p>
        ) : (
            <p>User Confirmation not found or already confirm</p>
        )
    ) : (
        <Loading />
    )
}
