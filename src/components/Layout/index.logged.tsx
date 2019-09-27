import React, { useEffect } from "react"
import { navigate } from "gatsby"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { getUser } from "./../../actions/auth"
import Loading from "./../Loading"

const IS_LOGGED = gql`
  query IsLogged($token: String!) {
    user(token: $token) {
      email
      firstname
      lastname
      isCheck
      token
    }
  }
`

const LoggedLayout = ({ children }: { children: any }) => {
  const token = getUser()
  const { loading, error, data = {} }: any = useQuery(IS_LOGGED, {
    variables: { token },
  })

  useEffect(() => {
    // When request is over :
    if (Object.keys(data).length) {
      if (!data.user.isCheck)
        navigate(`/user/not_confirm?email=${data.user.email}`)
    } else if (error) {
      navigate("/login")
    }
  })

  return !loading ? <div id="logged-layout">{children}</div> : <Loading />
}

export default LoggedLayout
