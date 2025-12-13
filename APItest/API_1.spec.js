import { test, expect, request } from '@playwright/test'

let responseBody;

test('API_set1', async ({ request }) => {
    const response = await request.get("https://reqres.in/api/users");
    responseBody = await response.json();
    const responseCode = await response.status();
    console.log('the response message i got is :' + responseCode)
    console.log(responseBody.data)

})

test('API_set2', async ({ request }) => {
    console.log('the mail id of the 1st id is : ' + responseBody.data[0].email)

})


test('adding new pet to the store', async ({ request }) => {

    const bodydata = { id: 21, category: { id: 21, name: "bookie" }, name: "bookie", photoUrls: ["not available"], tags: [{ id: 21, name: "bookie" }], status: "available" };
    const response = await request.post('https://petstore.swagger.io/v2/pet', { data: bodydata });
    console.log(await response.json())
    //request.post()
})



///////////////////////////////////////////////////////////////////////

test.only('addingNewPet', async ({ request }) => {

    // const bodyData = {
    //     id: 31,
    //     category: {
    //         id: 31,
    //         name: "dogesh"
    //     },
    //     name: "dogesh",
    //     photoUrls: [
    //         "no photos"
    //     ],
    //     tags: [
    //         {
    //             id: 31,
    //             name: "dogesh"
    //         }
    //     ],
    //     status: "available"
    // }
    const bodyData = {
        "id": 71,
        "category": {
            "id": 71,
            "name": "dogesh"
        },
        "name": "dogesh",
        "photoUrls": [
            "no photos"
        ],
        "tags": [
            {
                "id": 71,
                "name": "dogesh"
            }
        ],
        "status": "available"
    }
    const response = await request.post('https://petstore.swagger.io/v2/pet', { data: bodyData })
    console.log(await response.status())
    console.log(await response.json())
})

test('getPetInfoByID', async ({ request }) => {
})

test('updatePetInfo', async ({ request }) => {



})

// test('getPetInfoByID', async ({ request }) => {
// })

test('deletePetByID', async ({ request }) => {



})

// test('getPetInfoByID', async ({ request }) => {
// })