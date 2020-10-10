
/* ==========================================================================
    init
============================================================================= */

import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from '@/store/store';
import ShortifyHistory from '@/components/ShortifyHistory.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


/* ==========================================================================
    Setup
============================================================================= */

describe('ShortifyHistory.vue', () => {

  beforeEach(() => {
    store.dispatch('clearHistory');
  });


/* ==========================================================================
    Tests
============================================================================= */

  it('Displays no history items as the store is empty', () => {
    const shortifyHistory = mount(ShortifyHistory, {store, localVue});
    expect(shortifyHistory.findAllComponents({ name: "ShortifyHistoryItem" }).length).toBe(0);
  });


  it('Displays one history item as an entry has been added to the store', () => {
    store.dispatch('addToHistory', { 'code': 'iyeiN', 'short_link': 'shrtco.de/iyeiN', 'full_short_link': 'https://shrtco.de/iyeiN', 'short_link2': '9qr.de/iyeiN', 'full_short_link2': 'https://9qr.de/iyeiN', 'share_link': 'shrtco.de/share/iyeiN', 'full_share_link': 'https://shrtco.de/share/iyeiN', 'original_link': 'http://google.com' });
    const shortifyHistory = mount(ShortifyHistory, {store, localVue});
    expect(shortifyHistory.findAllComponents({ name: "ShortifyHistoryItem" }).length).toBe(1);
  });


  it('Displays two history items as two entries have been added to the store', () => {
    store.dispatch('addToHistory', { 'code': 'iyeiN', 'short_link': 'shrtco.de/iyeiN', 'full_short_link': 'https://shrtco.de/iyeiN', 'short_link2': '9qr.de/iyeiN', 'full_short_link2': 'https://9qr.de/iyeiN', 'share_link': 'shrtco.de/share/iyeiN', 'full_share_link': 'https://shrtco.de/share/iyeiN', 'original_link': 'http://google.com' });
    store.dispatch('addToHistory', { 'code': 'iyeiN', 'short_link': 'shrtco.de/iyeiN', 'full_short_link': 'https://shrtco.de/iyeiN', 'short_link2': '9qr.de/iyeiN', 'full_short_link2': 'https://9qr.de/iyeiN', 'share_link': 'shrtco.de/share/iyeiN', 'full_share_link': 'https://shrtco.de/share/iyeiN', 'original_link': 'http://google.com' });
    const shortifyHistory = mount(ShortifyHistory, {store, localVue});
    expect(shortifyHistory.findAllComponents({ name: "ShortifyHistoryItem" }).length).toBe(2);
  });


  it('Displays three history items as three entries have been added to the store', () => {
    store.dispatch('addToHistory', { 'code': 'iyeiN', 'short_link': 'shrtco.de/iyeiN', 'full_short_link': 'https://shrtco.de/iyeiN', 'short_link2': '9qr.de/iyeiN', 'full_short_link2': 'https://9qr.de/iyeiN', 'share_link': 'shrtco.de/share/iyeiN', 'full_share_link': 'https://shrtco.de/share/iyeiN', 'original_link': 'http://google.com' });
    store.dispatch('addToHistory', { 'code': 'iyeiN', 'short_link': 'shrtco.de/iyeiN', 'full_short_link': 'https://shrtco.de/iyeiN', 'short_link2': '9qr.de/iyeiN', 'full_short_link2': 'https://9qr.de/iyeiN', 'share_link': 'shrtco.de/share/iyeiN', 'full_share_link': 'https://shrtco.de/share/iyeiN', 'original_link': 'http://google.com' });
    store.dispatch('addToHistory', { 'code': 'iyeiN', 'short_link': 'shrtco.de/iyeiN', 'full_short_link': 'https://shrtco.de/iyeiN', 'short_link2': '9qr.de/iyeiN', 'full_short_link2': 'https://9qr.de/iyeiN', 'share_link': 'shrtco.de/share/iyeiN', 'full_share_link': 'https://shrtco.de/share/iyeiN', 'original_link': 'http://google.com' });
    const shortifyHistory = mount(ShortifyHistory, {store, localVue});
    expect(shortifyHistory.findAllComponents({ name: "ShortifyHistoryItem" }).length).toBe(3);
  });


});