import * as requester from './requester.js';

const endpoints = {
    add: '/data/donation',
    countOfDonation: (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    has: (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    
}

export const addDonation = (petId) => requester.post(endpoints.add, petId);

export const getCountOfDonation = (petId) => requester.get(endpoints.countOfDonation(petId));

export const hasDonate = (petId, userId) => requester.get(endpoints.has(petId, userId));