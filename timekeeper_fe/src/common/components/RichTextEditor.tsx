import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export interface IRichTextEditorProps {

};

const RichTextEditor = (props: IRichTextEditorProps) => {
    const { } = props
    const [editorContent, setEditorContent] = useState(EditorState.createEmpty());

    function onEditorStateChange(editorState: EditorState) {
        setEditorContent(editorState);
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <div>
                    <Editor
                        editorState={editorContent}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                            textAlign: {inDropdown: true}
                        }}
                    />
                    <textarea
                        disabled
                        value={draftToHtml(convertToRaw(editorContent.getCurrentContent()))}
                    />
                </div>
            </Grid>
        </Grid>
    )
}

export default RichTextEditor