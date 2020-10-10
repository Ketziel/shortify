
/* ==========================================================================
    init
============================================================================= */

import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from '@/store/store';
import ShortifyHistoryItem from '@/components/ShortifyHistoryItem.vue';

const localVue = createLocalVue();
localVue.use(Vuex);


/* ==========================================================================
    Setup
============================================================================= */

describe('ShortifyHistoryItem.vue', () => {

  beforeEach(() => {
    store.dispatch('clearHistory');
  });


/* ==========================================================================
    Tests
============================================================================= */


  it('Displays short link and long link for google.com, as provided via the object passed entry prop', () => {
    store.dispatch('addToHistory', { 'code': 'iyeiN', 'short_link': 'shrtco.de/iyeiN', 'full_short_link': 'https://shrtco.de/iyeiN', 'short_link2': '9qr.de/iyeiN', 'full_short_link2': 'https://9qr.de/iyeiN', 'share_link': 'shrtco.de/share/iyeiN', 'full_share_link': 'https://shrtco.de/share/iyeiN', 'original_link': 'http://google.com' });
    const shortifyHistoryItem = mount(ShortifyHistoryItem, {
      propsData: {
        entry: store.state.shortify.shortifyHistory[0]
      }
    });
    const shortLinkA = shortifyHistoryItem.find('a.short');
    const longLinkA = shortifyHistoryItem.find('a.original');

    expect(shortLinkA.element.getAttribute('href')).toBe('https://shrtco.de/iyeiN');
    expect(shortLinkA.element.textContent).toBe('shrtco.de/iyeiN');
    expect(longLinkA.element.getAttribute('href')).toBe('http://google.com');
  });


  it('Displays short link and long link for twitter.com, as provided via the object passed entry prop', () => {
    store.dispatch('addToHistory', { 'code': 'Zhd4L', 'short_link': 'shrtco.de/Zhd4L', 'full_short_link': 'https://shrtco.de/Zhd4L', 'short_link2': '9qr.de/Zhd4L', 'full_short_link2': 'https://9qr.de/Zhd4L', 'share_link': 'shrtco.de/share/Zhd4L', 'full_share_link': 'https://shrtco.de/share/Zhd4L', 'original_link': 'http://twitter.com' });
    const shortifyHistoryItem = mount(ShortifyHistoryItem, {
      propsData: {
        entry: store.state.shortify.shortifyHistory[0]
      }
    });
    const shortLinkA = shortifyHistoryItem.find('a.short');
    const longLinkA = shortifyHistoryItem.find('a.original');

    expect(shortLinkA.element.getAttribute('href')).toBe('https://shrtco.de/Zhd4L');
    expect(shortLinkA.element.textContent).toBe('shrtco.de/Zhd4L');
    expect(longLinkA.element.getAttribute('href')).toBe('http://twitter.com');
  });


});