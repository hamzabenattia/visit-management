import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar'
import Header from '../../components/Header'
import ListUser from '../../components/Admin/User/ListUser'
import { useDispatch, useSelector } from 'react-redux'
import { listUser } from '../../Redux/Actions/AdminAction'

const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, users } = userList;


  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <ListUser/>
    </main>
  </>
  )
}

export default UserListScreen