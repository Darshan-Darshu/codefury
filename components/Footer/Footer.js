import React from "react";

function Footer() {
  return (
    <footer className='grid grid-cols-1 md:grid-cols-4 px-32 md:px-52 md:py-14 bg-purple-700 text-white border-t-2 border-gray-200 mt-8'>
      <div className='space-y-4 text-sm text-gray-200 mt-5 md:mt-0'>
        <h5 className='font-bold'>ABOUT</h5>
        <p>terms of service</p>
        <p>privacy policy</p>
        <p>Codefury 4.0</p>
        <p>ABOUT US</p>
        <p>contact us</p>
        <p>Web development</p>
        <p>Data structures</p>
        <p>Algorithmk</p>
        <p>How to begin?</p>
      </div>
      <div className='space-y-4 text-sm text-gray-200 md:mt-5'>
        <h5 className='font-bold'>COMMUNITY</h5>
        <p>Diversity & Belonging</p>
        <p>Accessibility</p>
        <p>CS subjects</p>
        <p>vedios</p>
        <p>internships </p>
        <p>Languages</p>
      </div>
      <div className='space-y-4 text-sm text-gray-200 mt-5 md:mt-0'>
        <h5 className='font-bold'>HOST</h5>
        <p>Host your home</p>
        <p>Host an Online Experience</p>
        <p>Host an Experience</p>
        <p>Responsible hosting</p>
        <p>Resource Centre </p>
        <p>Community Centre</p>
      </div>
      <div className='space-y-4 text-sm text-gray-200 mt-5 md:mt-0'>
        <h5 className='font-bold'>SUPPORT</h5>
        <p>Our COVID-19 Response</p>
        <p>Help Centre</p>
        <p>Cancellation options</p>
        <p>Neighbourhood Support </p>
        <p>Trust & Safety</p>
      </div>
    </footer>
  );
}

export default Footer;
