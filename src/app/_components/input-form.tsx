import { Transcript, transcriptSchema } from "@/utils/types";
import { useState } from "react";


interface InputFormProps {
    onSubmit: (audioFile: File, transcript: 
        Transcript
    ) => void
}

export default function InputForm(props: InputFormProps) {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [transcript, setTranscript] = useState<Transcript| null>(null);

    const handleAudioFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const firstFile = files?.[0];
        if (!firstFile) {
            alert("No file selected");
            return;
        }
        setAudioFile(firstFile);
    }

    const handleTranscriptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const firstFile = files?.[0];
        if (!firstFile) {
            alert("No file selected");
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result;
            if (typeof result !== "string") {
                alert("Transcript file is not a string");
                return;
            }
            try {
                const transcript = JSON.parse(result);
                transcriptSchema.parse(transcript);
                setTranscript(transcript);
            } catch (error) {
                alert("Transcript file is not valid JSON");
            }
        }
        reader.readAsText(firstFile);
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (audioFile && transcript) {
                props.onSubmit(audioFile, transcript);
            } else {
                alert("Please select an audio file and a transcript file");
            }
        }}>
            <label>
                Audio File
                <input type="file" accept="audio/mpeg, audio/mp3"  onChange={handleAudioFileChange} />
            </label>
            <label>
                Transcript
                <input type="file" accept="application/json" onChange={handleTranscriptChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    )

        
}