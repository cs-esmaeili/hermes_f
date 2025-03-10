export const isEmailOrPhone = (username) => {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(?:\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4})$/;
    if (emailRegex.test(username)) {
        return 'email';
    } else if (phoneRegex.test(username)) {
        if (username.length != 11) {
            return null;
        }
        return 'phone';
    } else {
        return null;
    }
}
