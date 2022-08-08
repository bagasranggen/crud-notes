import React, { useEffect } from 'react';

// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export type CkEditorProps = {
    className?: string;
    id: string;
    register: any;
    required?: boolean | string;
    errors: any;
    trigger: any;
    data?: any;
    setValue?: (key: any, value: any) => void;
    onChange?: (event: any, editor: any) => void;
};

const CkEditor = ({ className, id, register, required, errors, trigger, data, setValue, onChange }: CkEditorProps): React.ReactElement => {
    useEffect(() => {
        register(id, {
            ...required ? { required: required } : {},
        });
    });

    return (
        <div className={`ckeditor-wrapper${className ? ` ${className}` : ''}`}>
            <div className={`ckeditor${errors[id] ? ' is-invalid' : ''}`}>
                <CKEditor
                    id={id}
                    className={'is-invalid'}
                    editor={ClassicEditor}
                    data={data}
                    config={{
                        // plugins: [ Paragraph, Bold, Italic, Essentials ],
                        toolbar: [ 'bold', 'italic', 'link', 'bulletedList', 'numberedList', ]
                    }}
                    onChange={(event: any, editor: any) => {
                        setValue && setValue(id, editor.getData());
                        trigger(id);
                        onChange && onChange(event, editor);
                    }} />
            </div>
            {errors[id] && <small className="invalid-feedback">{errors[id]?.message}</small>}
        </div>
    );
};

export default CkEditor;