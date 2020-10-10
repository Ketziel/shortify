
/* ==========================================================================
    init
============================================================================= */

import Model from '@/models/base/Model.js';


/* ==========================================================================
    Setup
============================================================================= */

describe('Model.js', () => {

  let model;

  beforeEach(() => {
    model = new Model();

    model.addField({
      name: 'forename',
      validation: {
        required: true
      }
    });

    model.addField({
      name: 'surname'
    });
    
    model.addField({
      name: 'email',
      validation: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      }
    });

  });


/* ==========================================================================
    Tests
============================================================================= */

  it('Has all the fields added correctly', () => {
    expect(model.fields.forename.name).toBe('forename');
    expect(model.fields.surname.name).toBe('surname');
    expect(model.fields.email.name).toBe('email');
  });


  it('Sets valid to false, and sets errors if validation on fields fails', () => {
    model.fields.forename.value = '';
    model.fields.surname.value = 'Wills';
    model.fields.email.value = 'not an email';
    
    expect(model.validate()).toBe(false);
    expect(model.fields.forename.validation.error).not.toBe(null);
    expect(model.fields.surname.validation.error).toBe(null);
    expect(model.fields.email.validation.error).not.toBe(null);
  });


  it('Sets valid to true, and has no errors if validation on fields succeeds', () => {
    model.fields.forename.value = 'Richard';
    model.fields.surname.value = 'Wills';
    model.fields.email.value = 'richard@wills.com';
    
    expect(model.validate()).toBe(true);
    expect(model.fields.forename.validation.error).toBe(null);
    expect(model.fields.surname.validation.error).toBe(null);
    expect(model.fields.email.validation.error).toBe(null);
  });


  it('Clears all validation errors when clearErrors is called', () => {
    model.fields.forename.value = '';
    model.fields.surname.value = 'Wills';
    model.fields.email.value = 'not an email';
    
    expect(model.validate()).toBe(false);
    expect(model.fields.forename.validation.error).not.toBe(null);
    expect(model.fields.surname.validation.error).toBe(null);
    expect(model.fields.email.validation.error).not.toBe(null);

    model.clearErrors()
    expect(model.fields.forename.validation.error).toBe(null);
    expect(model.fields.surname.validation.error).toBe(null);
    expect(model.fields.email.validation.error).toBe(null);
  });


  it('Outputs key/value pairs of fields as an object', () => {
    model.fields.forename.value = 'Richard';
    model.fields.surname.value = 'Wills';
    model.fields.email.value = 'richard@wills.com';

    expect(model.values()).toStrictEqual({'email': 'richard@wills.com', 'forename': 'Richard', 'surname': 'Wills'});
  });


});