import type { Preview } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { setup } from '@storybook/vue3';
import '../src/assets/styles/main.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {      
      const pinia = createPinia();
      
      return {
        components: { story },
        setup() {
          return {
            pinia 
          };
        },
        template: '<div style="margin: 2em;"><story /></div>'
      };
    },
  ],
};

setup((app) => {
  const pinia = createPinia();
  app.use(pinia);
});

export default preview; 