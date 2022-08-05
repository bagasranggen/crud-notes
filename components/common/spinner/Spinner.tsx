import React from 'react';

export type SpinnerProps = {
    className?: string;
};

const Spinner = ({ className }: SpinnerProps): React.ReactElement => (
    <div className={`text-center${className ? ` ${className}` : ''}`}>
        <div
            className="spinner-border text-primary"
            role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

export default Spinner;