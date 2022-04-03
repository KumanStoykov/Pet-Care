import { html } from '../library/library.js';
import { submitHandler } from '../utility/submitHandler.js';
import * as userService from '../services/userService.js';

const loginTemplate = (onSubmit) => html`
<section id="loginPage">
    <form @submit=${onSubmit} class="loginForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>`;

export const loginView = (context) => {

    const onSubmit = (date, e) => {
        const [email, password] = date;

        try {
            if (!email || !password) {
                throw new Error('All Fields are require!');
            }
            userService.login({ email, password })
            .then(() => {
                e.target.reset();
                context.page.redirect('/');
            });

        } catch (err) {
            alert(err.message);
        }
    }
    context.render(loginTemplate(submitHandler(onSubmit)));
}