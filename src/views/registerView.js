import { html } from '../library/library.js';
import { submitHandler } from '../utility/submitHandler.js';
import * as userService from '../services/userService.js';

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
    <form @submit=${onSubmit} class="registerForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
</section>`;

export const registerView = (context) => {

    const onSubmit = (date, e) => {
        const [email, password, repeatPassword] = date;

        try {
            if (!email || !password) {
                throw new Error('All Fields are require!');
            }
            if (password != repeatPassword) {
                throw new Error('Password and repeat password don\'t match!');
            }

            userService.register({ email, password })
            .then(() => {
                e.target.reset();
                context.page.redirect('/');
            });

        } catch (err) {
            alert(err.message);
        }
    }
    context.render(registerTemplate(submitHandler(onSubmit)));
}