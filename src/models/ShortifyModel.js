import Model from "./base/Model";

export default class ShortifyModel extends Model {
    constructor({url} = {}) {
        super();

        this.addField({
            name: 'url',
            value: url || '',
            validation: {
                required: true
            }
        });

        /* 
            TODO: Talk about this being a bit overkill, but is extendable.
            Also explain that this creates a devision between html form and data, allowing properties to be easily manipulated in other components
        */


    }
}