import React from 'react'
import { FaAngleDown } from 'react-icons/fa'



// no updates necessary

const InfoButtonContainer = props => {

    return (
        <div className="flex flex-wrap items-center justify-around p-4">
            <div onClick={props.terms} className="cursor-pointer w-1/4 footerLink flex flex-col items-center">
                <p className="m-0">Term Details</p>
                <FaAngleDown className="text-gray-800" />
            </div>
            <div onClick={props.faq} className="cursor-pointer w-1/4 footerLink flex flex-col items-center">
                <p className="m-0">FAQ</p>
                <FaAngleDown className="text-gray-800" />
            </div>
            <div onClick={props.eligibility} className="cursor-pointer w-1/4 footerLink flex flex-col items-center">
                <p className="m-0">Eligibility</p>
                <FaAngleDown className="text-gray-800" />
            </div>
            <div onClick={props.contact} className="cursor-pointer w-1/4 footerLink flex flex-col items-center">
                <p className="m-0">Contact</p>
                <FaAngleDown className="text-gray-800" />
            </div>
        </div>
    )
}



export default InfoButtonContainer