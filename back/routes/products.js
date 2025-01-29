const express = require("express");
const router = express.Router();
const Joi = require("joi");

const products = [];

/* Product List Get */
router.get("/", (req, res) => {
    res.send(products);
});

/* Add */
router.post("/", (req, res) => {
    const { error } = validateProduct(req.body);

    if (error) {
        console.error(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.status(201).send(product);
});

/* Update */
router.put("/:id", (req, res) => {
    const product = paramsQuery(req.params.id);

    if (!product) {
        return res.status(404).send("Not found.");
    }

    // Validate
    const { error } = validateProduct(req.body);

    if (error) {
        console.error(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    // Update
    product.name = req.body.name;
    product.price = req.body.price;

    res.send(product);
});

/* Delete */
router.delete("/:id", (req, res) => {
    const product = paramsQuery(req.params.id);

    if (!product) {
        return res.status(404).send("Not found.");
    }

    const index = products.indexOf(product);

    // Delete
    products.splice(index, 1);
    
    res.send(product);
});

/* Product Get */
router.get("/:id", (req, res) => {
    const product = paramsQuery(req.params.id);

    if (!product) {
        return res.status(404).send("Not found.");
    }

    res.send(product);
});

function validateProduct(product) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().required()
    });

    return schema.validate(product);
}

function paramsQuery(paramId) {
    return products.find(p => p.id == paramId) || null;
}

module.exports = router;