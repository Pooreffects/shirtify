interface IButtonProps {
  title: string;
  type?: 'filled' | 'outlined';
  customStyles?: string;
  handleClick: () => void;
}
import { useSnapshot } from 'valtio';
import state from '../store';
import { getContrastingColor } from '../config/helpers';

export default function CustomButton({
  title,
  type,
  customStyles,
  handleClick,
}: IButtonProps) {
  const snap = useSnapshot(state);

  const generateStyle = () => {
    switch (type) {
      case 'filled':
        return {
          backgroundColor: snap.color,
          color: getContrastingColor(snap.color),
        };
      case 'outlined':
        return {
          borderWidth: '1px',
          borderColor: snap.color,
          color: snap.color,
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle()}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
