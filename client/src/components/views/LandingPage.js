import React from 'react';

import './landingpage.css';
import NavBar from './NavBar';
import bgImage from './office1.mp4';

function LandingPage() {
    return (
        <div>
            <NavBar />
            <div className="Vid">
            <video autoPlay loop muted>
    <source src={bgImage} type='video/mp4' />
</video>
            </div>

<div className='hero-container'>
    <div className='section'>
    <h1>iKAZI</h1>
<p>Here to serve,<br/>
 Here to help</p>
    </div>

</div>

       
        </div>
    )
}

export default LandingPage;

