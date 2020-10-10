
/* ==========================================================================
    init
============================================================================= */

import Field from '@/models/base/Field.js';


/* ==========================================================================
    Setup
============================================================================= */

describe('Field.js', () => {

  let field;

  beforeEach(() => {
    field = new Field('testField');
  });


/* ==========================================================================
    Tests
============================================================================= */

  it('has the correct field name set', () => {
    expect(field.name).toBe('testField');
  });


  it('validates for required', () => {
    field.validation = {required: true};
    
    expect(field.validate()).toBe(false);
    
    field.value = 'This field now has value';
    expect(field.validate()).toBe(true);
  });
  
  
  it('validates length of input', () => {
    field.validation = {length: 10};

    field.value = 'This value is too long';
    expect(field.validate()).toBe(false);

    field.value = 'Acceptable';
    expect(field.validate()).toBe(true);
  });
  

  it('validates based on regex', () => {
    field.validation = {regex: /abc[a-z]*/};
  
    field.value = 'xyz';
    expect(field.validate()).toBe(false);

    field.value = 'abcdefg';
    expect(field.validate()).toBe(true);
  });


  it('Uses custom message for required validation fail', () => {
    field.validation = {required: true};
    field.errorMsgOverride = {required: 'Required custom error message'};
    
    expect(field.validate()).toBe(false);
    expect(field.validation.error).toBe('Required custom error message');
  });


  it('Uses custom message for length validation fail', () => {
    field.validation = {length: 10};
    field.errorMsgOverride = {length: 'Length custom error message'};
    
    field.value = 'This value is too long';
    expect(field.validate()).toBe(false);
    expect(field.validation.error).toBe('Length custom error message');
  });


  it('Uses custom message for length regex fail', () => {
    field.validation = {regex: /abc[a-z]*/};
    field.errorMsgOverride = {regex: 'Regex custom error message'};
    
    field.value = 'xyz';
    expect(field.validate()).toBe(false);
    expect(field.validation.error).toBe('Regex custom error message');
  });


});