import React from 'react';

type InputTextProps = {
    type?: 'text' | 'tel' | 'number';
    className?: string;
    placeholder?: string;
    id: string;
    register: any;
    required?: boolean | string;
    hidden?: boolean;
    validation?: {
        minLength?: {
            value: number;
            message: string
        };
        maxLength?: {
            value: number;
            message: string
        };
        pattern?: {
            value: any;
            message: string
        };
    };
    errors: any;
    onChange?: (e: any) => void;
};

const InputText = ({ type, placeholder, className, id, register, required, hidden, validation, errors, onChange }: InputTextProps): React.ReactElement => {
    const inputRegister = register(id, {
        ...required ? { required: required } : {},
        ...validation ? validation : {}
    });

    return (
        <div className={`input-wrapper${className ? ` ${className}` : ''}`}>
            <input
                type={type ? type : 'text'}
                className={`form-control${errors[id] ? ' is-invalid' : ''}`}
                placeholder={placeholder}
                {...hidden && { hidden: true }}
                {...inputRegister}
                onChange={(e: any) => {
                    inputRegister.onChange(e);
                    onChange && onChange(e);
                }} />
            {errors[id] && <small className="invalid-feedback">{errors[id].message}</small>}
        </div>
    );
};

export default InputText;