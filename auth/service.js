const users = {
    john: {
        username: 'john',
        password: '123456',
        name: 'John Doe',
        id: '2133d32a'
    },
    cliente2: {
        username: 'cliente2',
        password: '123456',
        name: 'cliente2',
        id: '123456'
    }
};

module.exports.validate = async (request, username, password, h) => {

    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }

    const isValid = password === user.password;
    const credentials = { id: user.id, username: user.username };

    return { isValid, credentials };
};