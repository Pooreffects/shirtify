import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '@assets';

// Define types for EditorTab and FilterTab
interface EditorTab {
  name: string;
  icon: string; // Adjust the type based on the actual type of the icons
}

interface FilterTab {
  name: string;
  icon: string; // Adjust the type based on the actual type of the icons
}

// Define types for DecalType
interface DecalType {
  stateProperty: string;
  filterTab: string;
}

// Define the EditorTabs array
export const EditorTabs: EditorTab[] = [
  {
    name: 'colorpicker',
    icon: swatch,
  },
  {
    name: 'filepicker',
    icon: fileIcon,
  },
  {
    name: 'aipicker',
    icon: ai,
  },
];

// Define the FilterTabs array
export const FilterTabs: FilterTab[] = [
  {
    name: 'logoShirt',
    icon: logoShirt,
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt,
  },
];

// Define the DecalTypes object
export const DecalTypes: Record<string, DecalType> = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt',
  },
};
