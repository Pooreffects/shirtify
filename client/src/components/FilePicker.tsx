import CustomButton from './CustomButton';

interface IFilePickerProps {
  file: File | null;
  setFile: (file: File) => void;
  readFile: (type: 'logo' | 'full') => void;
}

const FilePicker: React.FC<IFilePickerProps> = ({
  file,
  setFile,
  readFile,
}) => {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
          id='file-upload'
          type='file'
          accept='image/*'
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setFile(selectedFile);
            }
          }}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>
        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file ? file.name : 'No file selected'}
        </p>
      </div>
      <div className='mt-4 flex flex-wrap gap-3'>
        <CustomButton
          type='outlined'
          title='Logo'
          handleClick={() => readFile('logo')}
          customStyles='text-xs'
        />
        <CustomButton
          type='filled'
          title='Full'
          handleClick={() => readFile('full')}
          customStyles='text-xs'
        />
      </div>
    </div>
  );
};

export default FilePicker;
