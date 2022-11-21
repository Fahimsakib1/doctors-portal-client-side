import React from 'react';
import { Link } from 'react-router-dom';
import footerimg from '../../../assets/images/footer.png';

const Footer = () => {
    
    const date = new Date()
    const year = date.getFullYear();
    
    return (
        <footer className=" mt-64 " style={{
            background: `url(${footerimg})`,
            backgroundSize: 'cover',
            backgroundPosition: "center"
        }}>
            
            <div className='footer dark:bg-gray-800 py-12 px-16'>
                
                <div className=''>
                    <span className="footer-title ">Services</span>
                    <Link className="link link-hover" to='/'>Branding</Link>
                    <Link className="link link-hover" to='/'>Design</Link>
                    <Link className="link link-hover" to='/'>Marketing</Link>
                    <Link className="link link-hover" to='/'>Advertisement</Link>
                </div>

                <div className=''>
                    <span className="footer-title">Company</span>
                    <Link className="link link-hover" to='/'>About us</Link>
                    <Link className="link link-hover" to='/'>Contact</Link>
                    <Link className="link link-hover" to='/'>Jobs</Link>
                    <Link className="link link-hover" to='/'>Press kit</Link>
                </div>

                <div className=''>
                    <span className="footer-title">Legal</span>
                    <Link className="link link-hover" to='/'>Terms of use</Link>
                    <Link className="link link-hover" to='/'>Privacy policy</Link>
                    <Link className="link link-hover" to='/'>Cookie policy</Link>
                </div>

            </div>
            
            <div className='text-center  dark:bg-gray-900 py-4'>
                <p>{`Doctors Portal Copyright © ${year} - All right reserved by Fahim Faysal`}</p>
            </div>
        </footer>
    );
};

export default Footer;