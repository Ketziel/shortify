
/* ==========================================================================
    init
============================================================================= */

import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store/store'
import InputFieldShortifyUrl from '@/components/InputFieldShortifyUrl.vue'

const localVue = createLocalVue()
localVue.use(Vuex);


/* ==========================================================================
    Setup
============================================================================= */

describe('InputFieldShortifyUrl.vue', () => {

  let inputFieldShortifyUrl;
  let input;
  let button;

  beforeEach(() => {
    store.dispatch('createShortifyFormModel');

    inputFieldShortifyUrl = mount(InputFieldShortifyUrl, {
      propsData: {
        placeholder: 'Paste a URL',
        field: store.state.shortify.shortifyFormModel.fields.url,
        shortified: false,
        fetching: false
      }
    });

    input = inputFieldShortifyUrl.find('input');
    button = inputFieldShortifyUrl.find('a.button');

  });


/* ==========================================================================
    Tests
============================================================================= */

  it('Changes the input value, and updates the bound value in the store', () => {
    input.setValue('http://url.test');
    expect(store.state.shortify.shortifyFormModel.fields.url.value).toEqual('http://url.test');
  });


  it('Triggers events emits them', async () => {
    input.trigger('change');
    input.trigger('focus');
    input.trigger('keyup');
    button.trigger('click');

    await inputFieldShortifyUrl.vm.$nextTick();
    expect(inputFieldShortifyUrl.emitted().onChange).toBeTruthy();
    expect(inputFieldShortifyUrl.emitted().onFocus).toBeTruthy();
    expect(inputFieldShortifyUrl.emitted().onEdit).toBeTruthy();
    expect(inputFieldShortifyUrl.emitted().onButtonClick).toBeTruthy();
  });


  it('Triggers the button event when input has focus and keystroke.enter detected', async () => {
    input.trigger('keyup.enter');

    await inputFieldShortifyUrl.vm.$nextTick();
    expect(inputFieldShortifyUrl.emitted().onButtonClick).toBeTruthy();
  });


  it('Shows the initial button state when shortified & fetching are both false', () => {
    let spans = button.findAll('span');
    
    expect(spans.at(0).classes()).toContain('show');
    expect(spans.at(1).classes()).not.toContain('show');
    expect(spans.at(2).classes()).toEqual([]);
  });


  it('Shows the fetching button state when shortified is false & fetching is true', async () => {
    let spans = button.findAll('span');
    inputFieldShortifyUrl.setProps({
      fetching: true
    });
    
    await inputFieldShortifyUrl.vm.$nextTick();
    expect(spans.at(0).classes()).toEqual([]);
    expect(spans.at(1).classes()).toContain('show');
    expect(spans.at(2).classes()).toEqual([]);
  });


  it('Shows the fetching button state when shortified & fetching are both true', async () => {
    //Should not happen, however for any edge cases that arise, fetching should be the priority state
    let spans = button.findAll('span');
    inputFieldShortifyUrl.setProps({
      shortified: true,
      fetching: true
    });
    
    await inputFieldShortifyUrl.vm.$nextTick();
    expect(spans.at(0).classes()).toEqual([]);
    expect(spans.at(1).classes()).toContain('show');
    expect(spans.at(2).classes()).toEqual([]);
  });

  
  it('Shows the copy button state when shortified is true & fetching is false', async () => {
    let spans = button.findAll('span');
    inputFieldShortifyUrl.setProps({
      shortified: true
    });
    
    await inputFieldShortifyUrl.vm.$nextTick();
    expect(spans.at(0).classes()).toEqual([]);
    expect(spans.at(1).classes()).not.toContain('show');
    expect(spans.at(2).classes()).toContain('show');
  });


});