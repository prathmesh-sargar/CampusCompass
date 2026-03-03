import HeroSection from '../components/Home/HeroSection'
import CoreFeaturesSection from '../components/Home/CoreFeaturesSection'
import Footer from '../components/Home/Footer'

function LandingPage() {
    return (
        <div className='w-full overflow-x-hidden'>
            <HeroSection />
            <CoreFeaturesSection />
            <Footer />
        </div>
    )
}

export default LandingPage