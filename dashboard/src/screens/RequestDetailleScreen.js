import React from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import RequestDetailleMain from '../components/Request/RequestDetailleMain'

const RequestDetailleScreen = () => {
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <RequestDetailleMain/>
    </main>
  </>
  )
}

export default RequestDetailleScreen