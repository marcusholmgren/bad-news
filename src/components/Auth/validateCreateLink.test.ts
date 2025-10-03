import validateCreateLink from "./validateCreateLink";

it('should not be valid with empty form data', () => {
    const formData = {
    description: "",
    url: ""
    }

    const {description, url} = validateCreateLink(formData);
    expect(description).toBe("Description required");
    expect(url).toBe("URL required");
})

it('should not be valid with description below 10 characters', () => {
    const formData = {
        url: "test@home.com",
        description: "abc"
    }

    const {description} = validateCreateLink(formData);
    expect(description).toBe("Description must be at least 10 characters");
})