import React from 'react';
import Navbar from '../components/navbar/navbar';
import Hero from '../components/hero/hero';
import Stats from '../components/stats/stats';
import Safety from '../components/safety/safety';
import Services from '../components/services/services';
import Process from '../components/process/process';
import FeatureCards from '../components/featureCards/featureCards';
import Testimonials from '../components/testimonials/testimonials';
import CTA from '../components/cta/cta';
import Footer from '../components/footer/footer';

const LandingPage = () => {
    return (
        <div className="bg-white">
            <Navbar />
            <Hero />
            <Stats />
            <Safety />
            <Services />
            <Process />
            <FeatureCards />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
};

export default LandingPage;