import React from 'react'
import Button from './button'
import { applicationsLive, headline, nextCohortStartDate, schoolName } from '../constants/programInfo'

const Banner = props => {
    return (
    <div className='flex flex-col justify-center items-center relative z-0 ' id='banner'>
        {/* update h2 caps words with school-specific content */}
        <h1 className='text-3xl lg:text-4xl font-bold text-center text-gray-800 px-4'>{applicationsLive ? headline : `Applications for ${schoolName}'s next cohort will be available beginning ${nextCohortStartDate}`}</h1>
        {applicationsLive && <h2 className='text-base lg:text-xl font-light text-center text-gray-800'>Know exactly what you'll pay with Skills Fund</h2>}
            <Button
                buttonClassName='opacityApply uppercase bg-secondary p-3 lg:mb-0 w-40 rounded-full shadow-2xl text-white'
                divClassName='flex justify-center mt-5'
                text={applicationsLive ? 'apply now' : 'notify me'}
                onClick={props.applyNowOnClick}
                id="bannerApply"
            />
    </div>
    )
}

export default Banner;