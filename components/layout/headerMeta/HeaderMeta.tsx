import React from 'react';
import Head from 'next/head';

export type HeaderMetaProps = {
    title: string;
    meta?: any;
    favicon?: boolean;
};

const HeaderMeta = ({ title, meta, favicon }: HeaderMetaProps): React.ReactElement => (
    <Head>
        <title>{title}</title>
        {meta && meta}
        {favicon && <link
			rel="icon"
			href="/favicon.ico" />}
    </Head>
);

export default HeaderMeta;