const express = require('express');
const cors = require('cors');
const Database = require('node-json-db');
const { Config } = require('node-json-db');

const app = express();
const db = new Database('data', true, false, '/');  // Initialize JSON database
const port = 3000;

app.use(cors());
app.use(express.json());  // Parse JSON request body

// Initialize default values in the JSON database if they don't exist
async function initDatabase() {
    try {
        await db.getData('/totalSales');
    } catch (e) {
        await db.push('/totalSales', 0);
    }

    try {
        await db.getData('/serviceSales');
    } catch (e) {
        await db.push('/serviceSales', {
            1: 0,  // Smoking Outside
            2: 0,  // Swearing On Hallway
            // Add other service IDs here...
        });
    }

    try {
        await db.getData('/orders');
    } catch (e) {
        await db.push('/orders', []);
    }
}

// Call the initialization function
initDatabase();

// Endpoint to get total sales
app.get('/total-sales', async (req, res) => {
    try {
        const totalSales = await db.getData('/totalSales');
        res.json({ totalSales });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving total sales' });
    }
});

// Endpoint to get all orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await db.getData('/orders');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders' });
    }
});

// Endpoint to handle purchase of services
app.post('/purchase', async (req, res) => {
    const { serviceId, serviceName, customerName } = req.body;

    try {
        // Fetch the current service sales and total sales from the database
        const serviceSales = await db.getData('/serviceSales');
        const totalSales = await db.getData('/totalSales');

        // Check if the service ID exists
        if (serviceSales[serviceId] !== undefined && customerName) {
            // Update service and total sales
            serviceSales[serviceId] += 1;
            await db.push('/serviceSales', serviceSales);

            await db.push('/totalSales', totalSales + 1);

            // Store the order details in the database
            const orders = await db.getData('/orders');
            orders.push({
                customerName: customerName,
                serviceId: serviceId,
                serviceName: serviceName,
                timestamp: new Date()
            });
            await db.push('/orders', orders);

            res.status(200).json({ message: 'Purchase successful', totalSales: totalSales + 1 });
        } else {
            res.status(400).json({ message: 'Invalid service ID or missing customer name' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing purchase' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});