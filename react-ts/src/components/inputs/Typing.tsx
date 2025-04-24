import TypingProps from "../../types/TypingProps";

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