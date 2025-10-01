const Category = require("../models/category");

const initDefaultCategory = async () => {
    const defaultCategory = 'Other'; 
    try {
        const [category, created] = await Category.findOrCreate({
            where: { name: defaultCategory },
            defaults: { name: defaultCategory }
        });

        if (created) {
            console.log("✅ Default category 'Other' created.");
        } else {
            console.log("ℹ️ Default category 'Other' already exists.");
        }

    } catch (error) {
        console.error("❌ Error initializing default category:", error.message);
    }
};

module.exports = initDefaultCategory;
