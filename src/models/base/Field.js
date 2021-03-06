export default class Field {
    constructor(name, value, validation, errorMsgOverride) {
        this.name = name;
        this.value = value;
        this.validation = {
            required: validation && !!validation.required,
            length: validation && !isNaN(validation.length) ? validation.length : 0,
            regex: validation && validation.regex ? validation.regex : null,
            error: null
        };
        this.errorMsgOverride = errorMsgOverride || {};
        this.isValue = true;
    }

    validate() {
        this.validation.error = null;
        if (this.validation.required && (!this.value && this.value !== false)) {
            this.validation.error = this.errorMsgOverride.required || `This field is required`;
            return false;
        }

        if (this.validation.length && this.value && this.value.length && this.value.length !== this.validation.length) {
            this.validation.error = this.errorMsgOverride.length || `This field must be ${this.validation.length} characters`;
            return false;
        }

        if (this.validation.regex && this.value) {
            const regex = new RegExp(this.validation.regex);
            if (!regex.test(this.value)) {
                const fieldLabel = (this.name.charAt(0).toUpperCase() + this.name.slice(1)).match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(' ');
                this.validation.error = this.errorMsgOverride.regex || `${fieldLabel} format incorrect`;
                return false;
            }
        }

        return true;
    }

}