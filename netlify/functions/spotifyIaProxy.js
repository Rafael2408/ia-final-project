const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const fetch = await import('node-fetch');

        const response = await fetch.default('http://3.140.247.31/spotify-ia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: event.body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            statusCode: 502,
            body: JSON.stringify({ error: 'Bad Gateway', message: error.message }),
        };
    }
};
