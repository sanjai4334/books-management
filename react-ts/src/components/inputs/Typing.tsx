interface TypingProps {
    type?: string;
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Typing({type, label, name, value, onChange}: TypingProps) {
    return (
        <div className="col-md-6">
            <label className="form-label">{label}</label>
            <input
                type={type || "text"}
                name={name}
                className="form-control"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default Typing;