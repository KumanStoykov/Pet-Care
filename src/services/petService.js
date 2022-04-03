import * as requester from './requester.js';

const endpoints = {
    loadAllPets: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/pets',
    currentPet: '/data/pets/',
   delete: '/data/pets/',
   edit: '/data/pets/',
}

export const getAllPets = () => requester.get(endpoints.loadAllPets);

export const createPet = (data) => requester.post(endpoints.create, data);

export const loadCurrentPet = (id) => requester.get(endpoints.currentPet + id);

export const deletePet = (id) => requester.del(endpoints.delete + id);

export const editPet = (id, data) => requester.put(endpoints.edit + id, data);


