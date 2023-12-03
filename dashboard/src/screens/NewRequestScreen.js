import React from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import AddRequest from '../components/Request/AddRequest'

const NewRequestScreen = () => {
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <AddRequest/>
    </main>
  </>
  )
}

export default NewRequestScreen