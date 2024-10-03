import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state, { type State } from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';
import {
  EditorTabs,
  FilterTabs,
  DecalTypes,
  FilterTabKey,
  DecalTypeKey,
} from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import {
  Tab,
  AIPicker,
  FilePicker,
  ColorPicker,
  CustomButton,
} from '../components';

// Customizer component
const Customizer: React.FC = () => {
  const snap = useSnapshot(state);

  // Local state for file input and UI interactions
  const [file, setFile] = useState<File | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<string>('');
  const [activeFilterTab, setActiveFilterTab] = useState<
    Record<FilterTabKey, boolean>
  >({
    logoShirt: true,
    stylishShirt: false,
  });

  // Render the active editor tab component based on selection
  const renderActiveEditorTab = () => {
    const editorComponents: Record<string, JSX.Element | null> = {
      colorpicker: <ColorPicker />,
      filepicker: (
        <FilePicker file={file} setFile={setFile} readFile={readFile} />
      ),
      aipicker: <AIPicker />,
    };

    return editorComponents[activeEditorTab] || null;
  };

  // Handle decal updates based on the selected type (logo/full) and the result (image)
  const handleDecals = (type: DecalTypeKey, result: string) => {
    const decalType = DecalTypes[type];

    if (decalType) {
      // Directly use the state property from the decalType
      state[decalType.stateProperty] = result; // TypeScript should infer the correct type

      // Toggle the relevant filter tab
      toggleActiveFilterTab(decalType.filterTab);
    } else {
      console.error(`Invalid decal type: ${type}`);
    }
  };

  // Toggle the active state of the filter tab and update the texture
  const toggleActiveFilterTab = (tabName: FilterTabKey) => {
    setActiveFilterTab((prev) => ({
      ...prev,
      [tabName]: !prev[tabName],
    }));

    // Update the texture state in valtio based on the active filter tab
    state[tabName === 'logoShirt' ? 'isLogoTexture' : 'isFullTexture'] =
      !activeFilterTab[tabName];
  };

  // Read the selected file and update the decal based on its type
  const readFile = (type: DecalTypeKey) => {
    if (!file) return;

    reader(file).then((result) => {
      if (result) {
        handleDecals(type, result as string);
        setActiveEditorTab(''); // Reset editor tab after reading file
      }
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='absolute top-0 left-0 z-10'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {renderActiveEditorTab()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => (state.intro = true)}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name as FilterTabKey]}
                handleClick={() =>
                  toggleActiveFilterTab(tab.name as FilterTabKey)
                }
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
