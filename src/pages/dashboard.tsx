import React, { useEffect, useState } from "react"
import Layout from "./../components/Layout/index.logged"
import "bootstrap/dist/css/bootstrap.css"
import store from "./../store"
import Loading from "./../components/Loading"
import { connect } from "react-redux"
import { Container } from "react-bootstrap"

const Dashboard = ({ user }) => {
  const [loading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    console.log(store.getState())
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
