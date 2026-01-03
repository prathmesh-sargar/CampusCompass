
import Header from '../components/Home/Header'
import Footer from '../components/Home/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
function Layout() {
    return (
        <div>
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
