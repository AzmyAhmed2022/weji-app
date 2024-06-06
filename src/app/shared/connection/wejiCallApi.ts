const apiUrl = 'http://localhost:5140';
export class Controller {
    public static apiController = {
        config: 'commands/config',
        wejiCategoriesAndClassifications: `WejiCategoriesAndClassifications`,
        userRequest: `${apiUrl}/api/UserRequest`,
        userAuth: `UserAuth`,
        wejiCoo: `WejiCoo`,

        smsControl: `SmsControl`,
        Shared: `${apiUrl}/api/Shared`

    };
}