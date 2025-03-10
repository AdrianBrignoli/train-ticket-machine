<script setup lang="ts">
import type { SearchResult } from '@/types/station';
import { computed } from 'vue';
import type { KeyboardLayout } from '@/types/keyboard';

const props = defineProps<{
  searchResult?: SearchResult;
  hasInput: boolean;
  layout: KeyboardLayout;
}>();

defineEmits<{
  (e: 'specialKey', key: string): void;
  (e: 'letterClick', letter: string): void;
}>();

const buttonState = computed(() => (letter: string) => {
  if (letter === '⌫') {
    return {
      isActive: props.hasInput,
      isDisabled: !props.hasInput
    };
  }
  
  if (letter === '␣') {
    return {
      isActive: props.searchResult?.nextCharacters?.includes(' '),
      isDisabled: !props.searchResult?.nextCharacters?.includes(' ')
    };
  }
  
  return {
    isActive: props.searchResult?.nextCharacters?.includes(letter),
    isDisabled: !props.searchResult?.nextCharacters?.includes(letter)
  };
});

</script>

<template>
  <section class="keyboard-grid">
    <div class="keyboard-grid__letters">
      <div v-for="(row, i) in layout.letters" :key="i" class="keyboard-grid__row">
        <button
          v-for="letter in row"
          :key="letter"
          @click="
            /[⌫␣()&]/.test(letter) ? $emit('specialKey', letter) :
            $emit('letterClick', letter)
          "
          class="keyboard-grid__button"
          :class="{ 'keyboard-grid__button--active': buttonState(letter).isActive }"
          :disabled="buttonState(letter).isDisabled"
        >
          {{ letter }}
        </button>
      </div>
    </div>
    
    <div v-if="layout.actions.length" class="keyboard-grid__actions">
      <button 
        v-for="action in layout.actions" 
        :key="action"
        @click="
          action === '⌫' ? $emit('specialKey', action) :
          action === '␣' ? $emit('specialKey', action) : 
          null
        "
        class="keyboard-grid__button keyboard-grid__button--action"
        :class="{ 'keyboard-grid__button--active': buttonState(action).isActive }"
        :disabled="buttonState(action).isDisabled"
      >
        {{ action }}
      </button>
    </div>
  </section>
</template>

<style lang="scss">
@use './styles/KeyboardGrid.scss';
</style> 