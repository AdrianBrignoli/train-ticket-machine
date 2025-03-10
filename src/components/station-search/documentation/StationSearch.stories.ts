import type { Meta, StoryObj } from '@storybook/vue3';
import StationSearch from '../StationSearch.vue';
import { useStationStore } from '@/stores/stationStore';
import { useKeyboardLayout } from '../composables/misc/useKeyboardLayout';

const { keyboardLayout } = useKeyboardLayout('control');

const meta = {
  title: 'Components/StationSearch',
  component: StationSearch,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A keyboard-based interface for searching train stations',
    docs: {
      description: {
        component: `
The StationSearch component provides:
- Virtual keyboard for input
- Real-time station search
- Recent searches history
- Loading and error states
        `
      }
    }
  }
} satisfies Meta<typeof StationSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonRecentSearches = [
  { stationCode: 'BHM', stationName: 'Birmingham' },
  { stationCode: 'MAN', stationName: 'Manchester' }
];

const stations = [
  { stationCode: 'LON', stationName: 'London' },
  { stationCode: 'LDS', stationName: 'Leeds' },
  { stationCode: 'LPL', stationName: 'Liverpool' }
]

// Empty State
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Initial state of the station search component.
- Shows empty search input
- Shows available next letters based on stations
- Shows recent searches if available (limited to last 5 searches)
- No error messages or loading indicators
        `
      }
    }
  },
  decorators: [
    () => ({
      setup() {
        // Create a fresh store for each story
        const store = useStationStore();
        store.$patch({
          stations: stations,   
          availableCharacters: ['L'],       
          loading: false,
          keyboardLayout: keyboardLayout,
          errorMessage: '',
          recentSearches: commonRecentSearches
        });
        return {};
      },
      template: '<story/>'
    })
  ]
};

// Loading State
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Loading state while fetching station data.
- Displays loading spinner
- Keyboard and search input are disabled
- Provides visual feedback to user that data is being fetched
        `
      }
    }
  },
  decorators: [
    () => ({
      setup() {
        const store = useStationStore();
        store.$patch({
          stations: [],
          loading: true,      
          searchTerm: '',    
          errorMessage: '',
          recentSearches: []
        });
        return {};
      },
      template: '<story/>'
    })
  ]
};

// With Results
export const WithResults: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Active search state showing results for "L".
- Displays matching stations (London, Leeds, Liverpool)
- Shows available next letters based on matches
- Keyboard highlights only valid next letters
- Recent searches remain accessible below results
        `
      }
    }
  },
  decorators: [
    () => ({
      setup() {
        const store = useStationStore();
        store.$patch({
          stations: stations,
          filteredStations: stations,
          searchTerm: 'L',
          availableCharacters: ['E', 'I', 'O'],
          keyboardLayout: keyboardLayout,
          loading: false,
          errorMessage: '',
          recentSearches: commonRecentSearches
        });
        return {};
      },
      template: '<story/>'
    })
  ]
};

// With Error
export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Error state when station data cannot be loaded.
- Shows error message to user
- Recent searches are still visible if available
- Provides clear feedback about the failure
        `
      }
    }
  },
  decorators: [
    () => ({
      setup() {
        const store = useStationStore();
        store.$patch({
          stations: stations,    
          keyboardLayout: keyboardLayout,          
          loading: false,
          availableCharacters: ['L'],
          errorMessage: 'Please select a station first',
          recentSearches: commonRecentSearches
        });
        return {};
      },
      template: '<story/>'
    })
  ]
}; 