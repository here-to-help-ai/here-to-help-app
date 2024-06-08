interface TimelinePopup {
    seconds: number;
    component: JSX.Element;
}

interface ProgressBarProps {
    currentSeconds: number;
    totalSeconds: number;
    onSeek: (seconds: number) => void;

    timelinePopups: TimelinePopup[];
}

export default function ProgressBar() {
}