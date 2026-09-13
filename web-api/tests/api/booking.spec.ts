import {  test, expect } from '@playwright/test';
import { apiBaseurl } from '../../config/env';

test.describe('Booking API Tests', () => {
    test('Create Booking @createBooking @smoke', async ({ request }) => {
        const response = await request.post(`${apiBaseurl}/booking`, {
            data: {
                firstname: 'John',
                lastname: 'Doe',
                totalprice: 100,
                depositpaid: true,
                bookingdates: {
                    checkin: '2023-01-01',
                    checkout: '2023-01-02'
                },
                additionalneeds: 'Breakfast'
            }
        });
        await expect(response).toBeOK();
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody).toHaveProperty('booking'); 
    });
    test('auth returns a token @auth', async ({ request }) => {
        const response = await request.post(`${apiBaseurl}/auth`, {
            data: {
                username: process.env.API_USER,
                password: process.env.API_PASSWORD
            }
        });
        await expect(response).toBeOK();
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('token');
    });
});