// Must install 'node-fetch' first (with 'npm install node-fetch')
const fetch = require('node-fetch');

module.exports = function(req, res, log, next) {

    // ORIGINAL REQUEST
    const protocol = (req.protocol ? req.protocol : 'http') + '://';
    const host = req.hostname;
    const path = req.path;
    const query = req.query;

    // HANDLING NEW REQUEST - Choose if forward original path/query to different host only or change everything
    const newHost = 'jsonplaceholder.typicode.com';
    const newPath = '/posts/1/comments';
    const newQuery = Object.keys(query).length === 0 ? '' : 
        '?' + Object.keys(query).map(key => {
            return key + '=' + query[key]
        }).join('&');
    const label = query.label ? query.label : 'SARAY';
    
    // FORWARD AUTH TOKEN/BEARER
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: req.get('authorization') ? req.get('authorization') : ''
        }
    };

    // FETCH RESPONSE
    const url = protocol + newHost + newPath + newQuery;
    fetch(url, options)
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
            url: protocol + newHost + newPath + newQuery
        }
    })
    .then(json => {
        // CUSTOM JSON HANDLING
        if(!json.error){
            json.forEach((item, index) => {
                item.saray = `Label for user #${item.id} is ${label}`;
            });
        }
        res.json(json);
    }).catch(err => {
        // ERROR HANDLING
        res.json({
            error: true,
            statusText: err.message,
            url: url
        });
    });
}
