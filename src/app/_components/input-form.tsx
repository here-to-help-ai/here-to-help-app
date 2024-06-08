import { useState } from "react";


interface InputFormProps {
    onSubmit: (src: string
    ) => void
}

export default function InputForm(props: InputFormProps) {
    const [audioSrc, setAudioSrc] = useState<string | null>(null);


    return (
        <form 
         className="p-8 rounded-xl bg-white border border-gray-300 flex flex-col items-center gap-4"
        onSubmit={(event) => {
            event.preventDefault();
            if (audioSrc ) {
                props.onSubmit(audioSrc);
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
            type="file" accept="audio/mpeg, audio/mp3"  onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAudioSrc(URL.createObjectURL(file));
                }
              }} />
        
            <button
             className="bg-blue-500 text-white px-4 py-2 rounded-md"
             type="submit">Get Started</button>
        </form>
    )

        
}