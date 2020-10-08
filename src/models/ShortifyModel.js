import Model from "./base/Model";

export default class ShortifyModel extends Model {
    constructor({url} = {}) {
        super();

        this.addField({
            name: 'url',
            value: url || '',
            validation: {
                required: true,
                regex: /[...]*\.[...]*/
            },
            errorMsgOverride: {
                required: 'You need to enter a URL first!',
                regex: 'Sorry, this doesn\'t look like a valid URL'
            }
        });

        /* 
            TODO: Talk about this being a bit overkill, but is extendable.
            Also explain that this creates a devision between html form and data, allowing properties to be easily manipulated in other components
        */


    }
}