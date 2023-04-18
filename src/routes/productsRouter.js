import { Router } from 'express';
import { getProducts, getProductById, postProduct, updateProduct, deleteProduct  } from '../controllers/productsController.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const {limit} = req.query;
   
    try {
        const allProducts = await getProducts()

        if(limit) {
            const limitProducts = [...allProducts.slice(0, limit)]
            res.status(200).json(limitProducts)
        } else{
            res.status(200).json(allProducts)
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

productsRouter.get('/:pid', async(req, res) => {
    const {pid} = req.params;
    
    try {
        const productById = await getProductById(pid);
        res.status(200).json(productById);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
  
});


productsRouter.post('/', async(req, res) => {
    const { title, description, code,price, stock, category, thumbnail } = req.body;
    try {
        const addProduct = await postProduct(title, description, code,price, stock, category, thumbnail )
        res.status(201).json(addProduct);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
})

productsRouter.put('/:pid', async(req, res) => {
    const {pid} = req.params;
    const updatedFields = req.body

    try {
        const productById = await updateProduct( updatedFields,pid);
        res.status(200).json(productById);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


productsRouter.delete('/:pid', async(req, res) => {
    const {pid} = req.params;
    const id = parseInt(pid)

    try {
        const productById = await deleteProduct(id);
        res.status(200).json(productById);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


export default productsRouter;