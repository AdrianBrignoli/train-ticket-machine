export interface KeyboardLayout {
  letters: string[][];
  actions: string[];
  styles?: {
    specialCharacters?: {
      width: string;
      position: 'bottom';
    }
  }
} 