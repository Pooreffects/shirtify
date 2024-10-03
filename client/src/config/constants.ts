import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '../assets/';

// Define types for EditorTab
interface EditorTab {
  name: string;
  icon: string; // Adjust this type based on your actual icon type (e.g., string or JSX.Element)
}

// Define a union type for FilterTabKey and DecalTypeKey to restrict possible values
export type FilterTabKey = 'logoShirt' | 'stylishShirt';
export type DecalTypeKey = 'logo' | 'full';

// Define the EditorTabs array with type safety
export const EditorTabs: EditorTab[] = [
  { name: 'colorpicker', icon: swatch },
  { name: 'filepicker', icon: fileIcon },
  { name: 'aipicker', icon: ai },
];

// Define the FilterTabs array with type safety
export const FilterTabs = [
  { name: 'logoShirt', icon: logoShirt },
  { name: 'stylishShirt', icon: stylishShirt },
] as const; // Using 'as const' to infer literal types for FilterTabs

// Define the DecalTypes for managing decal states and filter tabs
export const DecalTypes = {
  logo: { stateProperty: 'logoDecal', filterTab: 'logoShirt' as FilterTabKey },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt' as FilterTabKey,
  },
} as const; // Using 'as const' to infer literal types for DecalTypes

// Define the types based on the keys of the DecalTypes
export type DecalType = (typeof DecalTypes)[DecalTypeKey]; // Defines the structure for DecalType
