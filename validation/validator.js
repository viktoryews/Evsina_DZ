function checkBody(sheme) {
    return(req, res, next) => {
        const result = sheme.validate(req.body);
        if (result.error) {
            return res.status(400).send({error: result.error.message});
        }
        next();
    }
};

function checkParams(sheme) {
    return(req, res, next) => {
        const result = sheme.validate(req.params);
        if (result.error) {
            return res.status(400).send({error: result.error.message});
        }
        next();
    }
};

module.exports = {checkBody, checkParams};