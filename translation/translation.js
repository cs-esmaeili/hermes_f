import translation from '@/translation/translations.json';

class Translator {
    constructor() {
        if (!Translator.instance) {
            this.language = process.env.NEXT_PUBLIC_LANGUAGE;
            Translator.instance = this;
        }
        return Translator.instance;
    }

    setLanguage(language) {
        if (translation[language]) {
            this.language = language;
        } else {
            console.warn(`Language "${language}" not found. Defaulting to "${this.language}".`);
        }
    }

    getCurrentLanguage() {
        return this.language;
    }
    
    get(key) {
        const keys = key.split('.'); 
        let value = translation[this.language];

        for (const k of keys) {
            if (value[k] !== undefined) {
                value = value[k];
            } else {
                console.error(`Translation key "${key}" not found.`);
                return key; 
            }
        }

        return value;
    }

    getMultiple(keys) {
        return keys.reduce((acc, key) => {
            acc[key] = this.get(key);
            return acc;
        }, {});
    }
}

const translatorInstance = new Translator();
export default translatorInstance;
