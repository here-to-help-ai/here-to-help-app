import { useState } from "react";


interface InputFormProps {
    onSubmit: (audioFile: File
    ) => void
}

export default function InputForm(props: InputFormProps) {
    const [audioFile, setAudioFile] = useState<File | null>(null);

    const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const firstFile = files?.[0];
        if (!firstFile) {
            alert("No file selected");
            return;
        }
        setAudioFile(firstFile);
    }


    return (
        <form 
         className="p-8 rounded-xl bg-white border border-gray-300 flex flex-col items-center gap-4"
        onSubmit={(event) => {
            event.preventDefault();
            if (audioFile ) {
                props.onSubmit(audioFile);
            } else {
                alert("Please select an audio file and a transcript file");
            }
        }}>
            <h1 className="text-center text-3xl font-semibold">
                Here-to-Help.ai
            </h1>

            <h2>
                Select get started with an audio file
            </h2>
          
            <input 
            className="border border-gray-300 rounded-md p-2"
            type="file" accept="audio/mpeg, audio/mp3"  onChange={handleAudioFileChange} />
        
            <button
             className="bg-blue-500 text-white px-4 py-2 rounded-md"
             type="submit">Get Started</button>
        </form>
    )

        
}