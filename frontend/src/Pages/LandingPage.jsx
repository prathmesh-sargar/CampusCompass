import HeroSection from '../components/Home/HeroSection'
import CoreFeaturesSection from '../components/Home/CoreFeaturesSection'
import Footer from '../components/Home/Footer'
import DemoVideoSection from '../components/Home/DemoVideoSection'

function LandingPage() {
    return (
        <div className='w-full overflow-x-hidden'>
            <HeroSection />
            <CoreFeaturesSection />
            <DemoVideoSection/>
            <Footer />
        </div>
    )
}

export default LandingPage