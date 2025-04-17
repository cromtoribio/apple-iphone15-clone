import React from 'react'
import {footerLinks} from "../constants/index.js";

const Footer = () => {
    return (
        <footer className="py-5 sm:px-10 ps-5">
            <div className="screen-max-width">
                <div>
                    <p className="font-semibold text-gray text-xs">
                        More ways to shop:
                        {' '}
                        <span className="underline text-blue">
                           Find an Apple Store {' '}
                        </span>
                        or {' '}
                        <span className="underline text-blue">
                           other retailer
                        </span>{' '}
                        near you
                    </p>
                    <p className="font-semibold text-gray text-xs">
                        Or call 1-800-888-8888
                    </p>
                </div>
                <div className='bg-neutral-700 my-5 h-[1px]'/>
                <div className="flex max-sm:flex-col md:items-center justify-between">
                    <p className="font-semibold text-gray text-xs">
                        Created by Chris Toribio • Experience Architect • {' '}
                        <a href="https://github.com/cromtoribio/apple-iphone15-clone" target="_blank" className="underline text-blue hover:text-white">View Code on Github</a>
                    </p>
                    <div className="flex max-sm:flex-col max-sm:mt-4">
                        {footerLinks.map((link, index) => (
                            <p key={link} className="font-semibold text-gray text-xs hover:text-white cursor-pointer max-sm:pr-2">
                                {link}{' '}{index !== footerLinks.length -1 && <span className="text-gray mx-2 max-sm:hidden">|</span> }
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
