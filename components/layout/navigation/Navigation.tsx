import React, { useState } from 'react';
import Link from 'next/link';

import navigationItems from '../../../dummy/navigationItems';

import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export type NavigationProps = {};

const Navigation = ({}: NavigationProps): React.ReactElement => {
    const [ show, setShow ] = useState(false);
    const [ isOpened, setIsOpened ] = useState(false);

    const handleClose = () => {
        setIsOpened(false);
        setTimeout(() => setShow(false), ((navigationItems.length - 1) * 50 + 350));
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar
                expand={false}
                sticky="top">
                <div className="container">


                    <Link href="/">
                        <Navbar.Brand>LOGO</Navbar.Brand>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded={show ? 'true' : 'false'}
                        aria-label="Toggle navigation"
                        onClick={show ? handleClose : handleShow}>
                        <div className="menu-toggle">
                            <div className="menu-toggle__text">
                                <div>Menu</div>
                                <div>Close</div>
                            </div>
                            <div className="menu-toggle__icon" />
                        </div>
                    </button>

                </div>
            </Navbar>

            <Offcanvas
                className={`offcanvas-fade${isOpened ? ' is-opened' : ''}`}
                backdrop={false}
                show={show}
                onEntered={() => setIsOpened(true)}
                onHide={handleClose}>
                <div className="mt-15 container">
                    <Offcanvas.Body>
                        <ul className="nav-list">
                            {navigationItems.map((n: any) => (
                                <li key={n.label}>
                                    <Link href={n.uri}>
                                        <a><span>{n.label}</span></a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Offcanvas.Body>
                </div>
            </Offcanvas>
        </>
    );
};

export default Navigation;