// role (string: admin, marketer, client)
const USER_ROLES = {
    ADMIN: "ADMIN",
    MARKETER: "MARKETER",
    CLIENT: "CLIENT",
}

const FILE_KEYS = {
    PROFILE_PICS: "profile_pics",
}

const MESSAGES = {
    ALREADY_EXIST: "User already exists",
    NOT_EXIST: "User does not exist",
    PASSWORD_INCORRECT: "Password is incorrect",
    PASSWORD_REQUIRED:
        "Password is required and should be at least 8 chars long",
    OLD_PASSWORD_INCORRECT: "Old Password is incorrect",
    NEW_PASSWORD_NOT_MATCH: "New Password does not match",
    PASSWORD_CHANGE_SUCCESS: "Password has been changed successfully",
    EMAIL_SENT_FOR_PASSWORD_RECOVERY:
        "Email has been sent to your mail for password recovery",
    EMAIL_REQUIRED_AND_UNIQUE: "Email is required and should be unique",
    ROLE_REQUIRED_AND_VALID:
        "Role is required and should be valid role type (ADMIN,MARKETER,CLIENT)",
    NOT_AUTHENTICATED: "Not authenticated",
}

export { USER_ROLES, FILE_KEYS, MESSAGES }
