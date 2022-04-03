import { html } from '../library/library.js';

const loggedIn = () => html`
<li><a href="/create">Create Postcard</a></li>
<li><a href="/logout">Logout</a></li>`;

const guest = () => html`
<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>`;

const navigationTemplate = (isLogged) => html`
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        ${isLogged
        ? loggedIn()
        : guest()
        }

    </ul>
</nav>`;

export const navigationView = (context) => {
    return navigationTemplate(context.user);
}