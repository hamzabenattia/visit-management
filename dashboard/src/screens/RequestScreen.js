import React from 'react'
import Header from '../components/Header'
import RequestMain from '../components/Request/RequestMain'
import Sidebar from '../components/sidebar'

const RequestScreen = () => {
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <RequestMain />
    </main>
  </>
  )
}

export default RequestScreen