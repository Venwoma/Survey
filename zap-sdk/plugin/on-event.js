export const onEvent = (search_box_selector, actionMap = {}) => {
    const searchNode = document.querySelector(search_box_selector);
    if (searchNode && !searchNode['data-watch']) {
        searchNode['data-watch'] = true;
        searchNode.dataset.watch = 'true';
        Object.forEach(actionMap, (value, key) => {
            searchNode.addEventListener(key, (event) => {
                value?.(event);
            });
        });
    }
};
