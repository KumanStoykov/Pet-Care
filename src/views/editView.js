import { html } from '../library/library.js';
import * as petService from '../services/petService.js';
import { submitHandler } from '../utility/submitHandler.js';

const editTemplate = (pet, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="editForm">
        <img src="./images/editpage-dog.jpg">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="Max" .value=${pet.name}>
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" .value=${pet.breed}>
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" .value=${pet.age}>
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" .value=${pet.weight}>
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" .value=${pet.image}>
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`;

export const editView = async (context) => {
    const id = context.params.id;

    const pet = await petService.loadCurrentPet(id);

    const onSubmit = (date, e) => {
        const [name, breed, age, weight, image] = date;

        try {
            if (date.some(i => i == '')) {
                throw new Error('All Fields are require!');
            }
            petService.editPet(id, { name, breed, age, weight, image })
            .then(() => {
                e.target.reset();
                context.page.redirect(`/details/${id}`);
            });

        } catch (err) {
            alert(err.message);
        }
    }


    context.render(editTemplate(pet, submitHandler(onSubmit)));
}