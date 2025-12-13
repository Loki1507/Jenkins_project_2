import { test, expect } from '@playwright/test';


test('LoginAPI', async ({ request }) => {

    const loginResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login',
        {
            data: { "user": { "email": "testking901@gmail.com", "password": "Testking@901" } },
        })

    //console.log(loginResponse.status())
    const loginRespData = await loginResponse.json()
    //console.log(loginRespData)
    console.log(loginRespData.user.username)
    console.log(loginRespData.user.token)

})