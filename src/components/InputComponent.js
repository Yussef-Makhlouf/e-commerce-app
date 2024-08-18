// import React from 'react';
import React, { forwardRef } from 'react';

const Input = forwardRef(({ id, inputErrors, type = "text", name, value, handleForm, label, ...rest }, ref) => {
    return (
        <>
            <label htmlFor={id} className='text-left'>{label}</label>
            <input
                type={type}
                name={id}
                value={type !== "file" ? value : undefined} // Don't set value for file inputs
                className={`form-control ${inputErrors ? "border-danger" : ""}`}
                onChange={handleForm}
                id={id}
                ref={ref}
                {...rest}
            />
            {inputErrors && <p className="text-danger">{inputErrors}</p>}
        </>
    );
});

export default Input;

/*function Input({id,inputErrors,type="text",name,value,handleForm,label, ...rest}) {
    return (
    <>
    <label htmlFor={id} className='text-left'>{label}</label>
        <input
    type={type}
    name={id}
    value={value}
    className={`form-control ${inputErrors ? "border-danger" : ""}`}
    onChange={handleForm}
    id={id}
    {...rest}
/>
{inputErrors && <p className="text-danger">{inputErrors}</p>}
</> 
);*/

        // <div className="form-group">
        //     <label  htmlFor={id}>{label}</label>
        //     <input   
        //             type={type}
        //             name={id} 
        //             value={value} 
        //             className={`form-control ${{inputErrors}&& "border-danger" }`}
        //             onChange={ handleForm}id={id} 
        //           {...rest} required/>
        //           {{inputErrors}&&<p className="text-danger">{inputErrors}</p>}
        // </div>
       
// }

// export default Input;