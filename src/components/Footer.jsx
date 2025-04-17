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
                <div className="flex md:flex-row sm:flex-col md:items-center justify-between">
                    <p className="font-semibold text-gray text-xs">
                        Copyright @ 2025 Apple Inc. All rights reserved.
                    </p>
                </div>
                    <div className="flex">
                        {footerLinks.map((link, index) => (
                            <p key={link} className="font-semibold text-gray text-xs">
                                {link}{' '}{index !== footerLinks.length -1 && <span className="mx-2">|</span> }
                            </p>
                        ))}
                    </div>
            </div>
        </footer>
    )
}
export default Footer
