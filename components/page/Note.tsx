import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

import { useSelector } from 'react-redux';
import { selectValue } from '../../store/notes/notesSlice';
import { useGlobalStateContext } from '../../store/context/GlobalContext';

import HeaderMeta from '../layout/headerMeta/HeaderMeta';
import NoteOperation from '../note/NoteOperation';
import NotePreview from '../note/NotePreview';

export type NoteProps = {};

const Note = ({}: NoteProps): React.ReactElement => {
    const { setLayout } = useGlobalStateContext();

    const fetcher = (url: any) => fetch(url).then((r) => r.json());
    const { data: notes, error: notesError, isValidating: notesIsValidating } = useSWR('/api/notes', fetcher);

    const findSelectedNote = (data: Array<any>, id: string) => {
        switch (selectedNoteId) {
            case '':
                return data.length > 0 ? data[0].data : '';

            default:
                const selected = data.find((d: any) => d.ref['@ref'].id === id)?.data;
                return selected ? selected : data.length > 0 ? data[0].data : '';
        }
    };

    const selectedNoteId = useSelector(selectValue);
    const [ selectedNote, setSelectedNote ] = useState<any>(findSelectedNote(notes, selectedNoteId));

    useEffect(() => {
        setSelectedNote(findSelectedNote(notes, selectedNoteId));
    }, [ selectedNoteId, notesIsValidating ]);

    useEffect(() => {
        setLayout(true);
    }, []);

    return (
        <>
            <HeaderMeta title="Create Note" />

            <div className="my-2 my-md-5 container">
                <div className="row gy-3">
                    <div className="col-md-3">
                        <NoteOperation
                            items={notes}
                            active={selectedNoteId}
                            itemsValidating={notesIsValidating} />
                    </div>
                    <div className="col-md-9">
                        <NotePreview note={selectedNote} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Note;