import { html } from '../library/library.js';
import { submitHandler } from '../utility/submitHandler.js';
import * as petService from '../services/petService.js';

const createTemplate = (onSubmit) => html`
<section id="createPage">
    <form @submit=${onSubmit} class="createForm">
        <img src="./images/cat-create.jpg">
        <div>
            <h2>Create PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" placeholder="Max">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" placeholder="2 years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" placeholder="5kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
            </div>
            <button class="btn" type="submit">Create Pet</button>
        </div>
    </form>
</section>`;

export const createView = (context) => {

    const onSubmit = (date, e) => {
        const [name, breed, age, weight, image] = date;

        try {
            if (date.some(i => i == '')) {
                throw new Error('All Fields are require!');
            }
            petService.createPet({ name, breed, age, weight, image })
            .then(() => {
                e.target.reset();
                context.page.redirect('/');
            });

        } catch (err) {
            alert(err.message);
        }
    }
    context.render(createTemplate(submitHandler(onSubmit)));
}