const mongoose = require('mongoose');

const testConnection = async (uri) => {
    console.log(`Testing URI: '${uri}'`);
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

// Test cases
testConnection('mongodb+srv://user:pass@cluster.mongodb.net'); // Valid format (will fail auth but pass scheme check)
testConnection('"mongodb+srv://user:pass@cluster.mongodb.net"'); // With quotes
testConnection(' mongodb+srv://user:pass@cluster.mongodb.net'); // With leading space
testConnection('my-db-connection'); // Completely invalid
