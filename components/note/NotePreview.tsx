import React from 'react';

export type NotePreviewProps = {
    note?: {
        title: string;
        description: any;
    };
};

const NotePreview = ({ note }: NotePreviewProps): React.ReactElement => (
    <>
        {note && (
            <>
                <h1 className="mb-3">{note.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: note.description }} />
            </>
        )}
    </>
);

export default NotePreview;