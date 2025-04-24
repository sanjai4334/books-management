import { ChangeEvent } from 'react';

export default interface TypingProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    parentClass?: string;
    error?: string;
}