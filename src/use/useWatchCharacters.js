import { watch } from 'vue';

export function useWatchCharacters(valueToWatch, numOfCharacters = 100) {
    watch(valueToWatch, (newValue) => {
        if (newValue.length === numOfCharacters) alert(`Note has too many characters. ${numOfCharacters} is the max`);
    });
}