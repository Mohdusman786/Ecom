import PasswordValidator from "password-validator"
var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(20)                                  // Maximum length 20
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase(1)                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']);

export default function formValidations(event) {
    let { name, value } = event.target
    switch (name) {
        case "name":
        case "username":
        case "color":
            if (value.length === 0)
                return name + " filed is mendatory"
            else if (value.length < 3 || value.length > 30)
                return name + " filed length must be greater the 3 and less then 30"
            else
                return ""
        case "email":
            if (value.length === 0)
                return name + " filed is mendatory"
            else if (value.length < 13 || value.length > 50)
                return name + " filed length must be greater the 13 and less then 50"
            else
                return ""

        case "password":
            if (schema.validate(value))
                return ""
            else
                return "Invalid Password! Its Length Should be 8 or more but less then 20, Should contains atleast 1 digit, 1 upper case character, 1 lower case chracter should not contain white space"
            break
        case "phone":
            if (value.length === 0)
                return name + " filed is mendatory"
            else if (value.length !== 10)
                return name + " filed length must be 10"
            else if (value[0] >= '0' && value[0] <= '5')
                return name + " filed must start with 6 or 7 or 8 or 9"
            else
                return ""

        case "message":
        case "subject":
            if (value.length === 0)
                return name + " filed is mendatory"
            else if (value.length < 3)
                return name + " filed length must be greater the 3"
            else
                return ""

        case "size":
            if (value.length === 0)
                return name + " filed is mendatory"
            else if (value.length > 10)
                return name + " filed length must be less then 10"
            else
                return ""

        case "baseprice":
        case "quantity":
            if (!value)
                return name + " filed is mendatory"
            else if (value < 0)
                return name + " Should not Less then 1"
            else
                return ""

        case "discount":
            if (!value)
                return name + " filed is mendatory"
            else if (value < 0 || value > 100)
                return "Discount Should be in Range 1 - 100"
            else
                return ""
        default:
            return ""
    }
}