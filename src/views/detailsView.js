import { html, nothing } from '../library/library.js';
import * as petService from '../services/petService.js';
import * as donationService from '../services/donateService.js';

const detailsTemplate = (pet, onDelete, onDonate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${pet.donation}$</h4>
            </div>
            
            ${pet.isLogged
            ? isOwnerTemplate(pet, onDelete, onDonate)                   
            : nothing
            }

        </div>
    </div>
</section>`;

const isOwnerTemplate = (pet, onDelete, onDonate) => html `
    <div class="actionBtn">
    ${pet.isOwner
    ? html ` <a href="/edit/${pet._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`

    : donateBtnTemplate(pet, onDonate)
    }                    
    </div>`;

const donateBtnTemplate = (pet, onDonate) => html `
    ${pet.hasDonate
    ? nothing
    : html `<a @click=${onDonate} href="/details/${pet._id}" class="donate">Donate</a>`
    }`;

export const detailsView = async (context) => {
    const petId = context.params.id;
    const user = context.user;

    const [pet, countOfDonation] = await Promise.all ([
        petService.loadCurrentPet(petId),
        donationService.getCountOfDonation(petId)
    ]);

    const hasDonate = await donationService.hasDonate(pet._id, user?.id);

    const donation = countOfDonation * 100;

    pet.donation = donation;
    pet.isLogged = Boolean(user);    
    pet.isOwner = Boolean(user?.id == pet._ownerId);
    pet.hasDonate = Boolean(hasDonate);

    
    const onDelete = async () => {
        const dialog = confirm('Delete!!!');

        if (dialog) {
           await petService.deletePet(petId);
                
            context.page.redirect('/');               
        }
    }

    const onDonate = async () => {
        await donationService.addDonation({ petId });
       
    }
    context.render(detailsTemplate(pet, onDelete, onDonate));
}