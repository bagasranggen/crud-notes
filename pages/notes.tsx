import React from 'react';
import type { NextPage } from 'next';

import { SWRConfig } from 'swr';

import Note from '../components/page/Note';

export async function getStaticProps() {
    const response = await fetch(`${process.env.BASE_WEB_URL}/api/notes`);
    const notes = await response.json();

    return {
        props: {
            fallback: {
                '/api/notes': notes
            }
        }
    };
}

export type NotesProps = NextPage & {
    fallback: any;
};

const Notes = ({ fallback }: NotesProps): React.ReactElement => {
    return (
        <SWRConfig value={{ fallback }}>
            <Note />
        </SWRConfig>
    );
};

export default Notes;