import { PropsWithChildren, createContext, useState, useContext } from "react";
import { Track } from "../types";

// const PlayerContext = createContext<any>(null);
type PlayerContextType = {
  track?: Track;
  setTrack: (track: Track) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType>({
    setTrack: () => {},
    setPlaying: () => {},
    playing: false,
});

export default  function PlayerProvider({children}: PropsWithChildren) {
    const [track, setTrack] = useState<Track>();
    const [playing, setPlaying] = useState<boolean>(false);
    // const [currentTrack, setCurrentTrack] = useState<Track>();
    // const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

    return (
        <PlayerContext.Provider value={{track, setTrack, playing, setPlaying}}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => useContext(PlayerContext);
