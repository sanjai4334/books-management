import { ChangeEvent } from 'react';

interface TypingProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    parentClass?: string;
    error?: string;
}

function Typing({ 
    label, 
    name, 
    value, 
    onChange, 
    type = "text", 
    placeholder = "", 
    parentClass = "col-md-6",
    error
}: TypingProps) {
    return (
        <div className={parentClass}>
            <label className="form-label">{label}</label>
            <input
                type={type}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default Typing;