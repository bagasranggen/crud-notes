import React from 'react';

export type ButtonProps = {
    type: 'anchor' | 'button';

};

const Button = ({}: ButtonProps): React.ReactElement => {
    return (
        <>TEST</>
    );
}

export default Button;