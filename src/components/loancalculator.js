import React, { useEffect, useState } from 'react'
import LoanCalcPaymentTable from './loancalcpaymenttable'
import Image from '../components/image'
import { UnmountClosed as Collapse } from 'react-collapse'
import { 
    defaultLoanAmount, 
    faq,
    interestRates,
    paymentTable,
    programLoanInfo,
    schoolName
} from '../constants/programInfo'

const LoanCalculator = props => {
    
    const [metroIndex, setMetroIndex] = useState(0)
    const [programIndex, setProgramIndex] = useState(0)
    const [loanValue, setLoanValue] = useState(defaultLoanAmount)
    const [programMax, setProgramMax] = useState(programLoanInfo[0]['loanInfo']['maxLoanAmt'])
    const [monthlyPayment, setMonthlyPayment] = useState({ payment36: null, payment60: null })
    const [totalPayment, setTotalPayment] = useState({ payment36: null, payment60: null })
    const [interestPayment, setInterestPayment] = useState({ payment36: null, payment60: null })
    const [nonPaymentPeriod, setNonPaymentPeriod] = useState(programLoanInfo[0]['loanInfo']['0']['k'])
    const [loanType, setLoanType] = useState(programLoanInfo[0]['defaultLoanType'])
    const [showLoanTypes, setShowLoanTypes] = useState(programLoanInfo[0]['showLoanTypes'])
    const [locations, setLocations] = useState(programLoanInfo[0]['locations'])
    const [metros, setMetros] = useState(programLoanInfo[0]['metros'])
    const [multiMetros, hasMultiMetros] = useState(programLoanInfo[0]['showMetros'])

    const formatter = new Intl.NumberFormat('en-US', { 
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // even dollar amounts without cents
    })

    const formatterWithCents = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const handleSliderAmt = e => {
        setLoanValue(e.target.value)
    }

    const calculateMonthlyPayment = () => {
        const monthlyRate36 = (Number(interestRates.ir36) / 100) / 12
        const monthlyRate60 = (Number(interestRates.ir60) / 100) / 12
        const borrowedAmount = Number(loanValue) || Number(defaultLoanAmount)
        const totalLoan = Number(borrowedAmount) * (1 + Number(faq.origFee))
        let payment36 = Number((monthlyRate36 * totalLoan)) / (1 - (1 / Math.pow(1 + monthlyRate36, 36)))
        let payment60 = Number((monthlyRate60 * totalLoan)) / (1 - (1 / Math.pow(1 + monthlyRate60, 60)))
        setMonthlyPayment({payment36: payment36.toFixed(2), payment60: payment60.toFixed(2)})
        calculateInterest()
        calculateTotalPayment()
    }

    const calculateInterest = () => {
        let interest36 = (Number(loanValue) * (1 + Number(faq.origFee)) / 12 * (Number(interestRates.ir36) / 100))
        let interest60 = (Number(loanValue) * (1 + Number(faq.origFee)) / 12 * (Number(interestRates.ir60) / 100))
        setInterestPayment({payment36: interest36.toFixed(2), payment60: interest60.toFixed(2)})
    }

    const calculateTotalPayment = () => {
        let months = [36, 60]
        let interestPeriod = nonPaymentPeriod
        let payments = []
        if(loanType === "0"){
            payments[0] = (interestPayment.payment36 * interestPeriod) + (monthlyPayment.payment36 * months[0])
            payments[1] = (interestPayment.payment60 * interestPeriod) + (monthlyPayment.payment60 * months[1])
        } else {
            payments[0] = monthlyPayment.payment36 * months[0]
            payments[1] = monthlyPayment.payment60 * months[1]
        }
        setTotalPayment({payment36: payments[0], payment60: payments[1]})
        
    }

    const handleProgramName = e => {
        setProgramIndex(Number(e.target.value))
        setLoanType(programLoanInfo[programIndex]['defaultLoanType'])
    }

    const handleLoanType = e => {
        setLoanType(e.target.value)
    }

    const handleMetro = e => {
        setMetroIndex(Number(e.target.value))
    }

    useEffect(() => {
        calculateMonthlyPayment() // run calculator when page loads to show initial amounts
        setLoanType(programLoanInfo[programIndex]['defaultLoanType'])
        hasMultiMetros(programLoanInfo[programIndex]['showMetros'])
        setShowLoanTypes(programLoanInfo[programIndex]['showLoanTypes'])

        // check to see if the program has multiple locations and set the program max based on individual cities
        if(programLoanInfo[programIndex]['showMetros']){
            setProgramMax(metros[metroIndex]['maxLoanAmt'])
        } else {
            setProgramMax(programLoanInfo[programIndex]['loanInfo']['maxLoanAmt'])
        }

        // if the program selected has a maximum loan amount smaller than the default loan amount, set the initial value of the slider to the program's max
        if(defaultLoanAmount > programLoanInfo[programIndex]['loanInfo']['maxLoanAmt']) {
            setLoanValue(programLoanInfo[programIndex]['loanInfo']['maxLoanAmt'])
        } else {
            setLoanValue(defaultLoanAmount)
        }
        // hook is triggered when the values in the array below are updated
    }, [metroIndex, programIndex, programMax])

    useEffect(() => {
        calculateTotalPayment()
    }, [monthlyPayment])

    useEffect(() => {
        if(loanType === '0') {
            setNonPaymentPeriod(programLoanInfo[programIndex]['loanInfo']['0']['k'])
        }
    }, [loanType])

    return (
        <div className={props.modal ? "loanCalculator opacity" : "loanCalculator"}>
            <div className="loanCalculator__content pt-8 bg-gray-100">

                <div className="loanCalculator__select flex flex-col items-center px-4">
                    <h2 className="text-gray-800">Simple. Transparent.</h2>
                    <p className="text-gray-800" id="leadText">Figuring out your monthly payments on a loan shouldn't require a math degree. Find out exactly what you'll pay at {schoolName} with a Skills Fund loan:</p>
                    
                    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"><Image /></div>

                    <div className="loanCalculator__selectInput">    
                        <select defaultValue={'default'} onChange={handleProgramName}>
                            <option disabled value="default">Select your program</option>
                            {programLoanInfo.map((program, i) => <option value={i} key={program.name}>{program.name}</option>)}
                        </select>
                    </div>

                    <p>{` `}</p>

                    <Collapse className="loanCalculator__selectInput" isOpened={showLoanTypes}>
                        <select defaultValue={'default'} onChange={handleLoanType}>
                            <option disabled value="default">Select your loan type</option>
                            <option value="0">Interest-Only</option>
                            <option value="1">Immediate Repayment</option>
                        </select>
                    </Collapse>

                    <p>{` `}</p>

                    <Collapse className="loanCalculator__selectInput" isOpened={multiMetros}>
                        <select defaultValue={'default'} onChange={handleMetro}>
                            <option disabled value="default">Select your location</option>
                            {metros.map((city, i) => <option key={city.location} value={i}>{city.location}</option>)}
                        </select>
                    </Collapse>
                </div>

                <div className="loanCalculator__slider flex flex-col items-center px-4">
                    <input className="loanCalculator__input w-full lg:w-1/2" onChange={handleSliderAmt} onTouchEnd={calculateMonthlyPayment} onMouseUp={calculateMonthlyPayment} type="range" min="2000" step="5" max={programMax} value={loanValue}/>
                    <div className="loanCalculator__labels flex justify-between w-full lg:w-1/2">
                        <p>$2,000</p>
                        <p className="text-center">Loan Amount<br/><span className="loanCalculator__amount">{formatter.format(loanValue)}</span></p>
                        <p>{formatter.format(programMax)}</p>
                    </div>
                    {/* <span className="loanCalculator__disclaimers" onClick={props.toggleModal}>Disclaimers</span> */}
                </div>
                <div className="loanCalculator__monthlyPayments flex">
                <div className="loanCalculator__36months w-1/2">
                    {/* <h3 className="text-md text-center mb-1">{loanType === "0" ? <span className={loanType === "0" ? "show" : "hide"}>Interest-Only</span> : <span className={loanType === "1" ? "show" : "hide"}>Immediate Repayment</span>}</h3> */}
                    <h3 className="text-center">36 Month Option</h3>
                    <span className={loanType === "0" ? "show" : "hide"}><><p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">${interestPayment.payment36}</p><p className="loanCalculator__paymentLabel text-center text-xs">Monthly Payments in School</p></></span>
                    <div className={loanType === "0" ? "show" : "show move"}>
                        <p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">${monthlyPayment.payment36}</p><p className="loanCalculator__paymentLabel text-center text-xs">Monthly Payments{loanType === "0" ? " After Graduation" : null}</p>
                        <p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">{formatterWithCents.format(totalPayment.payment36)}</p><p className="loanCalculator__paymentLabel text-center text-xs">Total Cost</p>
                    </div>
                </div>
                
                <div className="loanCalculator__60months w-1/2">
                    {/* <h3 className="text-md text-center mb-1">{loanType === "0" ? <span className={loanType === "0" ? "show" : "hide"}>Interest-Only</span> : <span className={loanType === "1" ? "show" : "hide"}>Immediate Repayment</span>}</h3> */}
                    <h3 className="text-center">60 Month Option</h3>
                    <span className={loanType === "0" ? "show" : "hide"}><><p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">${interestPayment.payment60}</p><p className="loanCalculator__paymentLabel text-center text-xs">Monthly Payments in School</p></></span>
                    <div className={loanType === "0" ? "show" : "show move"}>
                        <p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">${monthlyPayment.payment60}</p><p className="loanCalculator__paymentLabel text-center text-xs">Monthly Payments{loanType === "0" ? " After Graduation" : null}</p>
                        <p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">{formatterWithCents.format(totalPayment.payment60)}</p><p className="loanCalculator__paymentLabel text-center text-xs">Total Cost</p>
                    </div>
                </div>
                {/* <div className="loanCalculator__isa w-1/3">
                    <h3 className="text-md text-center mb-1">Income Share Agreement</h3>
                    <h4 className="text-center">Payment Plan</h4>
                    <span className="show"><><p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">$60,000</p><p className="loanCalculator__paymentLabel text-center text-xs">Annual Salary</p></></span>
                    <div>
                        <p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">$750</p><p className="loanCalculator__paymentLabel text-center text-xs">Monthly Payment</p>
                        <p className="loanCalculator__paymentAmounts text-3xl text-primary font-bold mb-1 text-center">{formatterWithCents.format(programMax * 1.5)}</p><p className="loanCalculator__paymentLabel text-center text-xs">Total Cost</p>
                    </div>
                </div> */}
                </div>
                <p className="show text-center text-sm mb-0 pb-4">{loanType === "0" ? "Make interest-only payments while in the program. Two months after completion, begin full payments." : "Start making full payments (interest + principal) about one month after disbursement."}

</p>

            </div>
        </div>
    )
}

export default LoanCalculator