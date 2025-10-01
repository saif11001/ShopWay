const { Op } = require('sequelize');
const Category = require('../models/category');
const Product = require('../models/product');
const httpStatusText = require('../utils/httpStatusText');

const getCategories = async(req, res, next) => {
    const { page = 1, limit = 2, sort = "createdAt", search } = req.query;
    const offset = ( page - 1 ) * limit;
    
    let whereClause = {};
    if(search) {
        whereClause.name = { [Op.like]: `%${search}%` }
    }
    
    try{
        const { rows: categories, count: totalCategories } = await Category.findAndCountAll({
            where: whereClause,
            order: [[sort, "ASC"]],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        const totalPages = Math.ceil(totalCategories / limit);
        
        res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Categories fetched successfully.', 
            data: {
                categories,
                pagination: {
                    totalCategories,
                    totalPages,
                    currentPage: parseInt(page),
                },
            },
        });

    } catch (error) {
        next(error);
    }
}

const getCategory = async (req, res, next) => {
    const categoryId = req.params.id;
    try{
        const category = await Category.findByPk(categoryId);
        if(!category) {
            return res.status(404).json({ status: httpStatusText.FAIL, message: 'Category not found !' });
        }
        res.status(200).json({ status: httpStatusText.SUCCESS, message: 'The category has been fetched successfully.', data: { category } })
    } catch (error) {
        next(error);
    }
}

const addCategory = async (req, res, next) => {
    const { name } = req.body;
    try{
        const oldCategory = await Category.findOne({ where: { name: name } });
        if(oldCategory) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'This category already exists.' });
        }
        const category = await Category.create({ name: name });
        await category.save();

        res.status(201).json({ status: httpStatusText.SUCCESS, message: 'Add category successfully.', data: { category } });
    } catch (error) {
        next(error);
    }
}

const updateCategory = async (req, res, next) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    try{
        const category = await Category.findByPk(categoryId);
        
        if(!category) {
            return res.status(404).json({ status: httpStatusText.FAIL, message: 'Category not found !' });
        }

        if (category.name === 'Other') {
            return res.status(404).json({ status: httpStatusText.FAIL, message: "You cannot update the default category 'Other'." });
        }

        if( category.name === name) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'The new name cannot be the same as the old name !' });
        }

        const oldCategory = await Category.findOne({ where: { name: name } });
        if(oldCategory) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'This category already exists.' });
        }
        
        category.name = name;
        await category.save();
        
        res.status(200).json({ status: httpStatusText.SUCCESS, message: 'Update category successfully.', data: { category } });

    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    const categoryId = req.params.id;
    try{
        const category = await Category.findByPk(categoryId);

        if(!category) {
            return res.status(404).json({ status: httpStatusText.FAIL, message: 'Category not found !' });
        }

        if (category.name === 'Other') {
            return res.status(400).json({ status: httpStatusText.FAIL, message: "You cannot delete the default category 'Other'." });
        }

        const defaultCategory = await Category.findOne({ where: { name: 'Other' } });
        if(!defaultCategory) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'Default category (Other) not found. Please create it first.' });
        }

        const products = await Product.findAll({ where: { CategoryId: categoryId } });
        if(products.length > 0) {
            await Product.update({ CategoryId: defaultCategory.id }, { where: { CategoryId: categoryId } });
        }

        await category.destroy();
        res.status(200).json({ status: httpStatusText.SUCCESS , message: "Category deleted successfully and related products moved to 'Other'." });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}