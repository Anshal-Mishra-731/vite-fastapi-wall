import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

function RTE({name = "content", control, label}) {
    return (
        <div className='w-full'>
            <label className='inline-block mb-1 pl-1'>{label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue= ""
                render= {({field}) => (
                    <Editor
                    apiKey="o6kte9gyej573brlczfdj3fwj6xunqk29ts83gguvjf1ty6k"
                    value= {field.value}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image",
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                            "anchor",
                        ],
                        toolbar:
                        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={(content, editor) => {
                        field.onChange(content);
                        const text = editor.getContent({format: 'text'});
                        const wordcount = text.trim().split(/\s+/).length;
                        if (wordcount > 1000) {
                            editor.undoManager.undo();
                            alert("You have exceeded the 1000 word limit!");
                        }
                    }}
                    />
                )}
            ></Controller>

        </div>  
    )
}
export default RTE;