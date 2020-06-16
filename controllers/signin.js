const handleSignIn = (req, res, db, bcrypt) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json('incorrect')
    }

    db
        .select('email', 'hash')
        .where('email', '=', req.body.email)
        .from('login')
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
            if (isValid) {
                return db
                    .select('*')
                    .from('users')
                    .where('email', '=', req.body.email)
                    .then(user => { res.json(user[0]) })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignIn: handleSignIn
};