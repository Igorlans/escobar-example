import CyrillicToTranslit from 'cyrillic-to-translit-js';

const cyrillicToTranslit = new CyrillicToTranslit({preset: 'uk'});

export default function translit(input) {
    return cyrillicToTranslit.transform(input, '_').toLowerCase();
}

