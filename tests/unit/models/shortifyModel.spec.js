
/* ==========================================================================
    init
============================================================================= */

import ShortifyModel from '@/models/ShortifyModel.js';


/* ==========================================================================
    Setup
============================================================================= */

describe('ShortifyModel.js', () => {

  let shortifyModel;

  beforeEach(() => {
    shortifyModel = new ShortifyModel();
  });


/* ==========================================================================
    Tests
============================================================================= */

  it('Fails validation if no url set', () => {
    expect(shortifyModel.validate()).toBe(false);
  });


  it('Does sense check on URL, passing a valid looking one', () => {
    shortifyModel.fields.url.value = 'google.com';
    expect(shortifyModel.validate()).toBe(true);
  });


  it('Does sense check on URL, failing an invalid looking one', () => {
    shortifyModel.fields.url.value = 'google';
    expect(shortifyModel.validate()).toBe(false);
  });



});