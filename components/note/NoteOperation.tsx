import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import inputValidation from '../../helper/InputValidation';

import useSWR, { useSWRConfig } from 'swr';
import { useForm } from 'react-hook-form';
import Spinner from '../common/spinner/Spinner';
import InputText from '../common/input/inputText/InputText';

import { useDispatch, useSelector } from 'react-redux';
import { getNotes, selectValue } from '../../store/notes/notesSlice';

const CkEditor = dynamic<any>(() => import('../common/ckEditor/CkEditor'), { loading: () => <Spinner />, ssr: false });

export type NoteOperationProps = {};

interface NoteFormTypes {
    title: string;
    description: string;
    edit: boolean | string;
}

const fetcher = (url: any) => fetch(url).then((r) => r.json());

const NoteOperation = ({}: NoteOperationProps): React.ReactElement => {
    const { mutate } = useSWRConfig();
    const { data, error, isValidating } = useSWR('/api/notes', fetcher);
    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const defaultValues = {
        title: '',
        description: '',
        edit: false,
    };

    const { handleSubmit, register, formState: { errors }, getValues, setValue, trigger, reset } = useForm<NoteFormTypes>({ defaultValues });

    useEffect(() => {
        getValues('edit') === false && reset(defaultValues);
    }, [ isVisible ]);

    const inputShowHandler = () => setIsVisible(!isVisible);

    const submitSaveNote = handleSubmit(async (data: any) => {
        setIsLoading(true);

        try {
            const res = await fetch('/api/notes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (res.status === 200) {
                // Router.push('/');
                setIsLoading(false);
                inputShowHandler();
                await mutate('/api/notes');
            } else {
                throw new Error(await res.text());
            }
        } catch (error) {
            console.error(error);
            // setErrorMessage(error.message);
        }
    });

    const submitEditNote = handleSubmit(async (data: any) => {
        setIsLoading(true);

        try {
            const res = await fetch(`/api/notes/${data.edit}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (res.status === 200) {
                // Router.push('/');
                setIsLoading(false);
                reset(defaultValues);
                inputShowHandler();
                await mutate('/api/notes');
            } else {
                throw new Error(await res.text());
            }
        } catch (error) {
            console.error(error);
            // setErrorMessage(error.message);
        }

    });

    const deleteNoteHandler = async (id: string) => {
        try {
            const res = await fetch(`/api/notes/${id}/delete`, {
                method: 'DELETE',
            });
            if (res.status === 200) {
                // router.push('/');
                await mutate('/api/notes');
            } else {
                throw new Error(await res.text());
            }
        } catch (error) {
            console.error(error);
        }
    };

    const editNoteHandler = (id: string) => {
        const selectedNote = data.find((d: any) => d.ref['@ref'].id === id).data;

        Object.keys(selectedNote).map((key: any) => {
            setValue(key, selectedNote[key], { shouldValidate: true });
        });
        setValue('edit', id, { shouldValidate: true });

        setIsVisible(true);
    };

    return (
        <>

            {!isVisible && (
                <button
                    className="w-100 btn btn-danger"
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

            {isValidating && <Spinner className="mt-2" />}

            <ul className="mt-2 list-unstyled">
                {data?.length > 0 ? data.map((d: any) => (
                    <li key={d.ts}>
                        <div className="input-group flex-nowrap">
                            <button
                                type="button"
                                className="btn btn-outline-secondary flex-grow-1">
                                <h4 className="mb-0">{d.data.title}</h4>
                            </button>
                            <button
                                type="button"
                                className="px-2 btn btn-outline-warning d-flex align-items-center"
                                onClick={() => editNoteHandler(d.ref['@ref'].id)}>
                                Edit
                            </button>
                            <button
                                type="button"
                                className="px-2 btn btn-outline-danger d-flex align-items-center"
                                onClick={() => deleteNoteHandler(d.ref['@ref'].id)}>
                                <div className="btn-close" />
                            </button>
                        </div>
                    </li>
                )) : (<div className="input-group">
                        <div className="btn flex-grow-1">Empty Note</div>
                    </div>
                )}
            </ul>

        </>
    );
};

export default NoteOperation;