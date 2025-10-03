import validateLogin from './validateLogin';

it('should not be valid with empty form data', () => {
    const formData = {
        email: "",
        password: ""
    }

    const {email, password} = validateLogin(formData);
    expect(email).toBe("Email required");
    expect(password).toBe("Password required");
})

it('should not be valid with password below 6 characters', () => {
    const formData = {
        email: "test@home.com",
        password: "abc"
    }

    const {password} = validateLogin(formData);
    expect(password).toBe("Password must be at least 6 characters");
})