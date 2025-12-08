import useSound from "../../hooks/useSound";
import clickSound from "../../assets/click.mp3";

export default function SoundButton({ children, onClick, className }) {
  const play = useSound(clickSound);

  return (
    <button
      onClick={(e) => {
        play();
        if (onClick) onClick(e);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
