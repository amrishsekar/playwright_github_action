import { test, expect } from "@playwright/test";

// Using this variable globally we want
var userId;

test('Get Req', async({ request }) => {
    // GET request to fetch data
    const get_response = await request.get("https://reqres.in/api/users?page=2");
    console.log(await get_response.json());
    // expecting the respective status of the request
    expect.soft(get_response.status()).toBe(200);
});

test('Post Req', async({ request }) => {
    // POST request to add data
    const post_response = await request.post("https://reqres.in/api/users", {
        data: { "name": "Amrish S", "job": "Tester" },
        headers: { "Accept": "application/json" }
    });
    // Storing the response in a variable 
    const result = await post_response.json();
    console.log(await result);
    // expecting the respective status of the request
    expect.soft(post_response.status()).toBe(201);
    // assigning the result's `id` in  variable -> `userId`. Purpose:`To update and delete the particular user in API` 
    userId = result.id;
});

test('Put Req', async({ request }) => {
    const put_response = await request.put("https://reqres.in/api/users" + userId, {
        data: { "name": "Amrish Sekar", "job": "Developer" },
        headers: { "Accept": "application/json" }
    });
    // expecting the respective status of the request
    expect(put_response.status()).toBe(404);
});

test('Delete Req', async({ request }) => {
    // DELETE request to terminate the data
    const delete_response = await request.delete("https://reqres.in/api/users" + userId);
    // expecting the respective status of the request
    expect.soft(delete_response.status()).toBe(204);
});