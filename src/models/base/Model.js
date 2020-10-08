import Field from './Field'

export default class Model {
    constructor() {
        this.fields = {};
        this.valid = false;
    }

    addField({name, value, validation, errorMsgOverride}) {
        this.fields[name] = new Field(name, value, validation, errorMsgOverride);
    }

    get hasChanged() {
        // const keys = Object.keys(this.fields);
        // let key;
        // for (let k in keys) {
        //     key = keys[k];
        //     if (this.fields.hasOwnProperty(key)) {
        //         if (this.fields[key].hasChanged) {
        //             return true;
        //         }
        //     }
        // }
        return false;
    }

    values() {
        return Object.keys(this.fields).reduce((obj, fieldName) => {
            if(this.fields[fieldName].isValue) {
                obj[fieldName] = this.fields[fieldName].value;
            }
            return obj;
        }, {});
    }

    validate() {
        const keys = Object.keys(this.fields);
        let valid = true;
        
        let key;
        for (let k = 0; k < keys.length; k++) {
            key = keys[k];
            if (!this.fields[key].validate()) {
                valid = false;
            }
        }

        this.valid = valid;
        return valid;
    }

    clearErrors() {
        const keys = Object.keys(this.fields);
        
        let key;
        for (let k = 0; k < keys.length; k++) {
            key = keys[k];
            this.fields[key].validation.error = null;
            
        }
    }
}