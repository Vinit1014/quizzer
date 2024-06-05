"use client"

import React from 'react'

interface ButtonProps {
    text:String
}

const ButtonComp : React.FC<ButtonProps> = ({text}) => {
  return (
    <div>
        <button
                type="button"
                className="flex w-30 justify-center mx-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  focus-visible:outline-indigo-600"
                // onClick={props.handleFun}
              >
                {text}
        </button>
    </div>
  )
}

export default ButtonComp
