const getRequest = (path, params = {}) => {
    const query = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
    return fetch(`https://api.shrtco.de/v2/${path}?${query}`, {method: 'GET'});
};

export const getShortUrl = (url) => {
    return getRequest('shorten', {'url': encodeURIComponent(url)});
}