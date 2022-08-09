import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

export type NotesState = {
    isVisible: boolean;
    isLoading: boolean;
    inputShowHandler: () => void;
    register: any;
    errors: any;
    getValues: any;
    setValue: any;
    trigger: any;
    reset: any;
    defaultValues: any;
    submitSaveNote: (data: any) => void;
    submitEditNote: (data: any) => void;
    deleteNoteHandler: (id: string) => void;
    editNoteHandler: (data: any, id: string) => void;
}

export const NotesStateContext = createContext<NotesState>({
    isVisible: false,
    isLoading: false,
    inputShowHandler: () => {
    },
    register: {},
    errors: {},
    getValues: {},
    setValue: () => {
    },
    trigger: {},
    reset: {},
    defaultValues: {},
    submitSaveNote: () => {
    },
    submitEditNote: () => {
    },
    deleteNoteHandler: () => {
    },
    editNoteHandler: () => {
    },
});

interface NoteFormTypes {
    title: string;
    description: string;
    edit: boolean | string;
}

const defaultValues = {
    title: '',
    description: '',
    edit: false,
};

export const NotesStateContextProvider = ({ children }: any) => {
    const { mutate } = useSWRConfig();
    const { handleSubmit, register, formState: { errors }, getValues, setValue, trigger, reset } = useForm<NoteFormTypes>({ defaultValues });

    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

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
        setIsLoading(true);

        try {
            const res = await fetch(`/api/notes/${id}/delete`, {
                method: 'DELETE',
            });
            if (res.status === 200) {
                // router.push('/');
                setIsLoading(false);
                await mutate('/api/notes');
            } else {
                throw new Error(await res.text());
            }
        } catch (error) {
            console.error(error);
        }
    };

    const editNoteHandler = (data: Array<any>, id: string) => {
        const selectedNote = data.find((d: any) => d.ref['@ref'].id === id).data;

        Object.keys(selectedNote).map((key: any) => {
            setValue(key, selectedNote[key], { shouldValidate: true });
        });
        setValue('edit', id, { shouldValidate: true });

        setIsVisible(true);
    };

    const defaultContext = {
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
        submitEditNote,
        deleteNoteHandler,
        editNoteHandler,
    };

    return (
        <NotesStateContext.Provider value={defaultContext}>
            {children}
        </NotesStateContext.Provider>
    );
};

export const useNotesStateContext = () => useContext(NotesStateContext);