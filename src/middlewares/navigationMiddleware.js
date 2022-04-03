import { render } from '../library/library.js';
import { navigationView } from '../views/navigationView.js';

const headerNavigation = document.querySelector('.navigationHeader');

export const navigationMiddleware = (context, next) => {

    render(navigationView(context), headerNavigation);
    next();
}