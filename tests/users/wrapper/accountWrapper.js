import { isValidUserName } from "../../../js/users/account/account";

async function isValidUserNameMock(username) {return await isValidUserName(username);}

export { isValidUserNameMock };