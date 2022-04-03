import { render } from '../library/library.js';

const root = document.querySelector('#content');

const renderContent = (content) => {
    render(content, root);
}

export const renderMiddleware = (context, next) => {

    context.render = renderContent;
    
    next();
}