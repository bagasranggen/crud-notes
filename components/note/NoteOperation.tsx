import React from 'react';
import dynamic from 'next/dynamic';

import { useNotesStateContext } from '../../store/context/NotesContext';

import inputValidation from '../../helper/InputValidation';

import Spinner from '../common/spinner/Spinner';
import InputText from '../common/input/inputText/InputText';
import NoteList from './NoteList';

const CkEditor = dynamic<any>(() => import('../common/ckEditor/CkEditor'), { loading: () => <Spinner />, ssr: false });

export type NoteOperationProps = {
    items: Array<any>;
    active: string;
    itemsValidating: boolean;
};

const NoteOperation = ({ items, active, itemsValidating }: NoteOperationProps): React.ReactElement => {
    const {
        isVisible,
        isLoading,
        inputShowHandler,
        register,
        errors,
        getValues,
        setValue,
        trigger,
        reset,
        defaultValues,
        submitSaveNote,
        submitEditNote
    } = useNotesStateContext();

    return (
        <>

            {!isVisible && (
                <button
                    className="w-100 btn btn--primary"
                    onClick={inputShowHandler}>Add a New Note
                </button>
            )}

            {isVisible && (
                <form onSubmit={getValues('edit') === false ? submitSaveNote : submitEditNote}>
                    <InputText
                        id="edit"
                        register={register}
                        errors={errors}
                        hidden />
                    <InputText
                        className="mb-2"
                        id="title"
                        register={register}
                        errors={errors}
                        required="Title is required"
                        placeholder="Note title"
                        validation={{
                            // minLength: { value: 3, message: 'Title is too short' },
                            // maxLength: { value: 8, message: 'Title is too long' },
                            // pattern: { value: inputValidation.onlyNumber, message: 'only number is allowed' },
                        }} />
                    <CkEditor
                        id="description"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        data={getValues('description')}
                        trigger={trigger}
                        required="Description is required" />

                    <div className="mt-2 btn-container text-center">
                        <button
                            type="submit"
                            className="btn btn-success"
                            {...isLoading && { disabled: true }} >Save
                        </button>
                        <button
                            type="reset"
                            className="btn btn-warning"
                            onClick={() => {
                                inputShowHandler();
                                reset(defaultValues);
                            }}
                            {...isLoading && { disabled: true }}>Cancel
                        </button>
                    </div>
                </form>
            )}

            <NoteList
                items={items}
                active={active}
                isLoading={itemsValidating || isLoading} />

        </>
    );
};

export default NoteOperation;