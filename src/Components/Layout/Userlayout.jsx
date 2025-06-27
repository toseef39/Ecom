import { Outlet } from "react-router-dom"
import Footer from "../Common/Footer"
import Header from "../Common/Header"

const Userlayout = () => {
  return (
    <>
    <Header/>
    {/* Main content */}
    <main>
      <Outlet/>
    </main>
    {/* Footer */}
    <Footer/>
    </>
  )
}

export default Userlayout