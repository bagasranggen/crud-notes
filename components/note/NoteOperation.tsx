import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import inputValidation from '../../helper/InputValidation';

import useSWR, { useSWRConfig } from 'swr';
import { useForm } from 'react-hook-form';
import Spinner from '../common/spinner/Spinner';
import InputText from '../common/input/inputText/InputText';

const CkEditor = dynamic<any>(() => import('../common/ckEditor/CkEditor'), { loading: () => <Spinner />, ssr: false });

export type NoteOperationProps = {};

interface NoteFormTypes {
    title: string;
    description: string;
}

const fetcher = (url: any) => fetch(url).then((r) => r.json());

const NoteOperation = ({}: NoteOperationProps): React.ReactElement => {
    const { mutate } = useSWRConfig();
    const { data, error, isValidating } = useSWR('/api/notes', fetcher,);

    const defaultValues = {
        title: '',
        description: ''
    };

    const { handleSubmit, register, formState: { errors }, setValue, trigger, reset } = useForm<NoteFormTypes>({ defaultValues });


    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        reset(defaultValues);
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

    return (
        <>

            {!isVisible && (
                <button
                    className="w-100 btn btn-danger"
                    onClick={inputShowHandler}>Add a New Note
                </button>
            )}

            {isVisible && (
                <form onSubmit={submitSaveNote}>
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
                        trigger={trigger}
                        required="Description is required" />

                    <div className="mt-2 btn-container text-center">
                        <button
                            className="btn btn-success"
                            {...isLoading && { disabled: true }} >Save
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={inputShowHandler}
                            {...isLoading && { disabled: true }}>Cancel
                        </button>
                    </div>
                </form>
            )}

            {isValidating ? (
                <Spinner className="mt-2" />
            ) : (
                <div className="mt-2 card">
                    <ul className="list-group list-group-flush">
                        {data?.length > 0 ? data.map((d: any) => (
                            <li
                                key={d.ts}
                                className="list-group-item">
                                <h4 className="mb-0">{d.data.title}</h4>
                                {/*{d.ref['@ref'].id}*/}
                                <button
                                    className="btn"
                                    onClick={() => deleteNoteHandler(d.ref['@ref'].id)}>x
                                </button>
                                {/*<div dangerouslySetInnerHTML={{ __html: d.data.description }} />*/}
                            </li>
                        )) : <li className="list-group-item">Empty</li>}
                    </ul>
                </div>
            )}

        </>
    );
};

export default NoteOperation;