// src/components/ui/MusicButton.jsx

import React, { useState, useEffect, useRef, memo } from 'react';
import { Volume2, VolumeX } from 'lucide-react'; 

// 🚨 CORRECTED PATH: 
// When an asset is in the public folder, you reference it relative 
// to the base URL (which is just '/').
const musicFile = '/assets/Music/hype-drill-music-438398.mp3'; 

const MusicButton = memo(() => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Initial setup: runs once when the component mounts
    useEffect(() => {
        // We use the absolute path starting from the root '/'
        audioRef.current = new Audio(musicFile);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3; // 30% volume
        
        // Cleanup function for unmounting
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []); 

    // Play/Pause control: runs whenever 'isPlaying' state changes
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                // Attempt to play. This must be triggered by the user's click action.
                audioRef.current.play().catch(error => {
                    console.warn("Autoplay was prevented by the browser. Resetting state.", error);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Handler to toggle the play state
    const handleToggleMusic = () => {
        setIsPlaying(prev => !prev);
    };
    
    // Choose the icon and aria-label based on the state
    const MusicIcon = isPlaying ? Volume2 : VolumeX;
    const ariaLabel = isPlaying ? "Pause background music" : "Play background music";

    return (
        <button 
            onClick={handleToggleMusic}
            type="button"
            // Using your existing button classes for consistent styling
            className="p-2 rounded-full text-muted-foreground hover:text-primary transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 will-change-transform"
            aria-label={ariaLabel}
        >
            <MusicIcon className="w-6 h-6" />
        </button>
    );
});

MusicButton.displayName = "MusicButton";

export default MusicButton;