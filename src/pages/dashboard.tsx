import React, { useEffect, useState } from "react"
import Layout from "./../components/Layout/index.logged"
import store from "./../store"
import Loading from "./../components/Loading"
import { connect } from "react-redux"
import { Container, Button } from "react-bootstrap"
import { logout } from "./../actions/auth"
import { IUser } from "./../interfaces/redux.interface"

const Dashboard = ({ user }: { user: IUser }) => {
  const [loading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    const { firstname, lastname, email } = store.getState().user
    if (email && firstname && lastname) setLoading(false)
  }, [user])

  return (
    <Layout>
      <Container id="logged-container" className="bg-light">
        {!loading ? (
          <>
            <h1>Dashboard</h1>
            <p className="text-info">
              Welcome back {user.firstname} {user.lastname} !
            </p>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Loading />
        )}
      </Container>
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  const { user } = state
  return {
    user,
  }
}

export default connect(mapStateToProps)(Dashboard)
