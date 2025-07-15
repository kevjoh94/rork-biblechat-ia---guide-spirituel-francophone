import { AccessibilityInfo } from 'react-native';

export interface AccessibilityProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: 
    | 'none'
    | 'button'
    | 'link'
    | 'search'
    | 'image'
    | 'keyboardkey'
    | 'text'
    | 'adjustable'
    | 'imagebutton'
    | 'header'
    | 'summary'
    | 'alert'
    | 'checkbox'
    | 'combobox'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'scrollbar'
    | 'spinbutton'
    | 'switch'
    | 'tab'
    | 'tablist'
    | 'timer'
    | 'toolbar';
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
}

export const createAccessibilityProps = (
  label: string,
  hint?: string,
  role?: AccessibilityProps['accessibilityRole'],
  state?: AccessibilityProps['accessibilityState']
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: role,
  accessibilityState: state,
});

export const buttonAccessibility = (
  label: string,
  hint?: string,
  disabled?: boolean
): AccessibilityProps => 
  createAccessibilityProps(label, hint, 'button', { disabled });

export const textAccessibility = (
  label: string,
  hint?: string
): AccessibilityProps => 
  createAccessibilityProps(label, hint, 'text');

export const headerAccessibility = (
  label: string,
  level: number = 1
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityRole: 'header',
  accessibilityValue: { text: `Niveau ${level}` },
});

export const progressAccessibility = (
  current: number,
  max: number,
  label?: string
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label || `Progression ${current} sur ${max}`,
  accessibilityRole: 'progressbar',
  accessibilityValue: {
    min: 0,
    max,
    now: current,
    text: `${Math.round((current / max) * 100)}%`,
  },
});

export const switchAccessibility = (
  label: string,
  isOn: boolean,
  hint?: string
): AccessibilityProps => 
  createAccessibilityProps(label, hint, 'switch', { checked: isOn });

export const checkScreenReaderEnabled = async (): Promise<boolean> => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch {
    return false;
  }
};

export const announceForAccessibility = (message: string) => {
  AccessibilityInfo.announceForAccessibility(message);
};

// Color contrast helpers
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Simple luminance calculation for hex colors
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const sRGB = [r, g, b].map(c => 
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

export const meetsWCAGAA = (foreground: string, background: string): boolean => {
  return getContrastRatio(foreground, background) >= 4.5;
};

export const meetsWCAGAAA = (foreground: string, background: string): boolean => {
  return getContrastRatio(foreground, background) >= 7;
};