// Must install 'node-fetch' first (with 'npm install node-fetch')
const fetch = require('node-fetch');

module.exports = function(req, res, log, next) {

    // ORIGINAL REQUEST
    const protocol = (req.protocol ? req.protocol : 'http') + '://';
    const host = req.hostname;
    const path = req.path;
    const query = req.query;

    // HANDLING NEW REQUEST - Choose if forward original path/query to different host only, or change everything
    const newHost = 'jsonplaceholder.typicode.com';
    const user = query.user ? query.user : '1';
    const newPath = `/users/${user}`;
    
    // REQUEST OPTIONS
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    };

    // FETCH RESPONSE
    fetch(protocol + newHost + newPath)
    .then(response => {
        const statusCode = response.status;
        const statusText = response.statusText;
        // ERROR CATCH
        return (statusCode === 200) ? 
        response.json() : 
        {
            error: true,
            status: statusCode,
            statusText: statusText,
            url: protocol + newHost + newPath
        }
    })
    .then(json => {
        // CUSTOM JSON HANDLING
        if(!json.error)
            json.label = `Label for user #${json.id} is a SARAY stub`;
        res.json(json);
    }).catch(err => {
        // ERROR HANDLING
        res.json({
            error: true,
            statusText: err.message,
            url: protocol + newHost + newPath
        });
    });
}
