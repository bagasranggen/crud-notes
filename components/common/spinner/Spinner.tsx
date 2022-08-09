import React from 'react';

export type SpinnerProps = {
    className?: string;
    style?: any;
};

const Spinner = ({ className, style }: SpinnerProps): React.ReactElement => (
    <div className={`text-center${className ? ` ${className}` : ''}`} {...style && { style: style }}>
        <div
            className="spinner-border"
            role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

export default Spinner;