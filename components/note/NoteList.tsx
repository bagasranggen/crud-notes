import React from 'react';

import { useNotesStateContext } from '../../store/context/NotesContext';

import { select, selectValue } from '../../store/notes/notesSlice';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../common/spinner/Spinner';

export type NoteListProps = {
    items: Array<any>;
    active?: string;
    isLoading: boolean;
};

const NoteList = ({ items, active, isLoading }: NoteListProps): React.ReactElement => {
    const { deleteNoteHandler, editNoteHandler } = useNotesStateContext();
    const dispatch = useDispatch();

    return (
        <ul className={`mt-2 list-unstyled list--note${isLoading ? ' position-relative' : ''}`}>
            {isLoading && <Spinner style={{ zIndex: 9, position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
            {items?.length > 0 ? items.map((d: any, i: number) => (
                <li key={d.ts}>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="noteList"
                            id={d.ref['@ref'].id}
                            value={d.ref['@ref'].id}
                            onChange={() => dispatch(select(d.ref['@ref'].id))}
                            readOnly
                            {...active === '' ? (i === 0 ? { defaultChecked: true } : {}) : (active === d.ref['@ref'].id && { defaultChecked: true })}
                            hidden />

                        <label
                            className="form-check-label"
                            htmlFor={d.ref['@ref'].id}>
                            {d.data.title}
                        </label>
                    </div>
                    <div
                        className="btn-edit"
                        onClick={() => editNoteHandler(items, d.ref['@ref'].id)} />
                    <div
                        className="btn-close"
                        onClick={() => deleteNoteHandler(d.ref['@ref'].id)} />
                </li>
            )) : (<li className="">
                    <button
                        type="button"
                        className="btn w-100"
                        disabled>
                        Empty Note
                    </button>
                </li>
            )}
        </ul>
    );
};

export default NoteList;