const LAYOUTS = {
  test: {
    letters: [
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',],
      ['V', 'W', 'X', 'Y', 'Z', '(', ')', '&']
    ],
    actions: ['⌫', '␣']
  },
  default: {
    letters: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X',],
      ['C', 'V', 'B', 'N', 'M', '(', ')', '&', '⌫', '␣']
    ],
    actions: []
  }
};

/**
 * Provides keyboard layout configuration based on AB test variant
 * 
 * @remarks
 * This composable manages two keyboard layouts:
 * 1. Control - All letters shown with the same layout
 * 2. Test - Special layout for erase and space
 * 
 * @param variant - AB test variant ('control' or 'test')
 * @returns Keyboard configuration object
 * @property {Array<Array<string>>} keyboardLayout.letters - Grid of letter keys
 * @property {Array<string>} keyboardLayout.actions - Special action keys (backspace, space)
 * 
 * @example
 * const { keyboardLayout } = useKeyboardLayout('control');
 * // Returns Control layout
 * 
 * const { keyboardLayout } = useKeyboardLayout('prominent_actions');
 * // Returns Test layout
 */
export function useKeyboardLayout(variant: string) {
  return {
    keyboardLayout: variant === 'prominent_actions' ? LAYOUTS.test : LAYOUTS.default
  };
} 