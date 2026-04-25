//We need to use forwardref here, because we are creating this input comp here but we will use it at other places which complicates state management without forwardref
import React, { forwardRef, useId } from 'react';

function Input({
    label, 
    type = "text",
    className = 'w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500',
    ...props
}, ref) {
    const id = useId();
    return (
        <div className= 'w-full'>
            {label ? <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-300'>{label}</label> : null}
            <input
                type = {type}
                className= {`${ className }`}
                ref={ref}
                id = {id}
                {...props}
            />
        </div>
    )
}

export default React.forwardRef(Input);
