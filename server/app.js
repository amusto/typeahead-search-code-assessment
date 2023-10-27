/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const url       = require('url');
const hostname  = 'localhost';
const port      = 3035;

const ACTIVE_DATA = () => data.filter(item => item.isActive);

// Note: Im using a for loop so I can add products tags to a set for unique values?
const UNIQUE_PRODUCT_TAGS = () => {
  let result = [];

  for(let i = 0; i < ACTIVE_DATA().length; i++) {
    result = [...new Set([...result, ...ACTIVE_DATA()[i].tags])]
  }

  return result;
};

const searchData = ({queryString}) => ACTIVE_DATA().filter(i => new RegExp(queryString.toLowerCase(), 'i').test(i.name))

const findMatchingProductTag = ({queryString}) => UNIQUE_PRODUCT_TAGS().filter(i => new RegExp(queryString.toLowerCase(), 'i').test(i));

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */

const requestListener = function(req, res) {
  // Note: Handling CORS (Would be different in PRODUCTION) (Handled via AWS Cloudfront headers - There are Many approaches that could be implemented!)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
  };

  let chunks = [];
  // 'data' event is emitted on every chunk received
  req.on("data", (chunk) => {
    // collecting the chunks in array
    chunks.push(chunk);
  });

  // when all chunks are received, 'end' event is emitted.
  req.on("end", () => {
    // joining all the chunks received
    const incomingData = Buffer.concat(chunks);

    // data.toString() converts Buffer data to querystring format
    const querystring = incomingData.toString();

    // URLSearchParams: takes querystring
    // & returns a URLSearchParams object instance.
    const parsedData = new URLSearchParams(querystring);
    const dataObj = {};

    // entries() method returns an iterator
    // allowing iteration through all key/value pairs
    for (var pair of parsedData.entries()) {
      dataObj[pair[0]] = pair[1];
    }
    // Now request data is accessible using dataObj

    // get search query param from get request
    const {queryString} = url.parse(req.url, true).query;

    // get query results
    const queryResults = searchData({queryString});

    // get any matching tags
    const suggestionText = findMatchingProductTag({queryString});

    const searchResults = {
      data: queryResults,
      suggestionString: suggestionText[0]
    }

    res.setHeader("Content-Type", "application/json");
    res.writeHead(200, headers);
    res.end(JSON.stringify(searchResults, null, 3));
  });
}

const server = http.createServer(requestListener);
server.listen(port, hostname, () => {
  console.log(`[Server running on ${hostname}:${port}]`);
})
