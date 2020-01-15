// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const isDevelopment2 = process.env.NODE_ENV !== 'production';

console.log('renderer', isDevelopment2, process.env.NODE_ENV);
