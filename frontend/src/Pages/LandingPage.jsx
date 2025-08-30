
import HeroSection from '../Components/Home/HeroSection'
import PrepSimplifier from '../Components/Home/PrepSimplifier'
import Footer from '../Components/Home/Footer'



function LandingPage() {
    return (
        <div className='  w-full overflow-x-hidden'>
            <HeroSection />
            <PrepSimplifier />
            <Footer/>
        
            {/* <CodingPlatform />
            
            <CodingPortfolio />
            <FAQ />      */}
        </div>
    )
}

export default LandingPage
