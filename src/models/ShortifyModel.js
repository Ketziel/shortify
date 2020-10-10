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

    }
}