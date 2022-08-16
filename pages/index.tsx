import type { NextPage } from 'next';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useGlobalStateContext } from '../store/context/GlobalContext';

import HeaderMeta from '../components/layout/headerMeta/HeaderMeta';
import Spinner from '../components/common/spinner/Spinner';

const Home: NextPage = () => {
    const { setLayout } = useGlobalStateContext();

    const [ show, setShow ] = useState<boolean>(false);
    const [ isExit, setIsExit ] = useState<boolean>(false);
    const [ fade, setFade ] = useState<string>('');

    setTimeout(() => setShow(true), 250);

    useEffect(() => {
        setLayout(false);
    }, []);

    useEffect(() => {
        isExit && setFade('fade');
    }, [ isExit ]);

    return (
        <>
            <HeaderMeta title="Note" />

            <div className="welcome">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className={`col-md-8 col-lg-6 col-xl-4${isExit ? ' position-relative' : ''}`}>
                            <h1 className={`title-welcome${show ? ' title-welcome--show' : ''}${isExit ? ' title-welcome--exit' : ''}`}>
                                <div>
                                    <span className="title-welcome__first">CRUD</span>
                                </div>
                                <div className="my-1 title-welcome__btn text-center">
                                    <Link
                                        href="/notes"
                                    >
                                        <a
                                            className="btn btn--primary"
                                            onClick={() => setIsExit(true)}>Start</a>
                                    </Link>
                                </div>
                                <div className="text-end">
                                    <span className="title-welcome__last">Notes</span>
                                </div>
                            </h1>
                            {isExit && <Spinner className={fade} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
