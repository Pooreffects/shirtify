interface IButtonProps {
  title: string;
  type?: 'filled' | 'outlined';
  customStyles?: string;
  handleClick: () => void;
}
import { useSnapshot } from 'valtio';
import state from '../store';

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
          color: '#fff',
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: '#000',
          border: '1px solid #000',
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
