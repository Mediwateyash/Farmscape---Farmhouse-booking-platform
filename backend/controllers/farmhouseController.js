const Farmhouse = require('../models/Farmhouse');

// @desc    Get all farmhouses
// @route   GET /api/farmhouses
// @access  Public
const getFarmhouses = async (req, res) => {
    try {
        const farmhouses = await Farmhouse.find({});
        res.json(farmhouses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single farmhouse
// @route   GET /api/farmhouses/:id
// @access  Public
const getFarmhouseById = async (req, res) => {
    try {
        const farmhouse = await Farmhouse.findById(req.params.id);

        if (farmhouse) {
            res.json(farmhouse);
        } else {
            res.status(404).json({ message: 'Farmhouse not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a farmhouse
// @route   POST /api/farmhouses
// @access  Admin
const createFarmhouse = async (req, res) => {
    const { name, location, price, description, amenities } = req.body;

    // Handle image uploads
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        const farmhouse = new Farmhouse({
            name,
            location,
            price,
            description,
            amenities: amenities.split(','), // Assuming amenities are sent as comma-separated string
            images,
        });

        const createdFarmhouse = await Farmhouse.create(farmhouse);
        res.status(201).json(createdFarmhouse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a farmhouse
// @route   PUT /api/farmhouses/:id
// @access  Admin
const updateFarmhouse = async (req, res) => {
    const { name, location, price, description, amenities } = req.body;

    try {
        const farmhouse = await Farmhouse.findById(req.params.id);

        if (farmhouse) {
            farmhouse.name = name || farmhouse.name;
            farmhouse.location = location || farmhouse.location;
            farmhouse.price = price || farmhouse.price;
            farmhouse.description = description || farmhouse.description;
            if (amenities) {
                farmhouse.amenities = amenities.split(',');
            }
            // If new images are uploaded, append them or replace? 
            // For simplicity, let's append if provided, or maybe just keep old ones if not.
            // A more complex logic would be needed to delete old ones.
            if (req.files && req.files.length > 0) {
                const newImages = req.files.map(file => file.path);
                farmhouse.images = [...farmhouse.images, ...newImages];
            }

            const updatedFarmhouse = await farmhouse.save();
            res.json(updatedFarmhouse);
        } else {
            res.status(404).json({ message: 'Farmhouse not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a farmhouse
// @route   DELETE /api/farmhouses/:id
// @access  Admin
const deleteFarmhouse = async (req, res) => {
    try {
        const farmhouse = await Farmhouse.findById(req.params.id);

        if (farmhouse) {
            await farmhouse.deleteOne();
            res.json({ message: 'Farmhouse removed' });
        } else {
            res.status(404).json({ message: 'Farmhouse not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFarmhouses,
    getFarmhouseById,
    createFarmhouse,
    updateFarmhouse,
    deleteFarmhouse,
};
