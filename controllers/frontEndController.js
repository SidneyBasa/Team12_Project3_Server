const router = require('express').Router();
const { User, Organization, Incident } = require('../models');

// The `/api/products` endpoint

// get all users with incidents and organization

// router.get("/", (request, response)=>{
//   // Adding data for blog posts to the home page
//   User.findAll({
//       subQuery: false,
//       include:
//       [
//           { model: Incident }, 
//           { model: Organization},
//       ]

//   }).then(blogData=>{
//       // checking blogData in the terminal
//       const homeHandlebarBlogs = blogData.map(blogpost=>blogpost.toJSON())
//       console.log("Value of homeHandlebarBlogs", homeHandlebarBlogs)
//           response.render("home", {
//           allBlogs:homeHandlebarBlogs,
//       })
//   })
// })

// // get one product
// router.get('/:id', (request, response) => {
//   // find a single product by its `id`
//   // be sure to include its associated Category and Tag data
//     Product.findByPk(request.params.id,{
//         include:[{
//             model:Category,
//             include:[Product]
//         }]
//     }).then(data=>{
//         if(data){
//            return  response.json(data);
//         } else {
//           response.status(404).json({
//                 msg:"no product record"
//             })
//         }
//     }).catch(error=>{
//         console.log(error);
//         response.status(500).json({
//             msg:"an error occurred",
//             eerrorrr:error
//         })
//     })
// });

// // create new product
// router.post('/', (req, res) => {
//   /* req.body should look like this...
//     {
//       product_name: "Basketball",
//       price: 200.00,
//       stock: 3,
//       tagIds: [1, 2, 3, 4]
//     }
//   */
//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

// // update product
// router.put('/:id', (req, res) => {
//   // update product data
//   Product.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((product) => {
//       // find all associated tags from ProductTag
//       return ProductTag.findAll({ where: { product_id: req.params.id } });
//     })
//     .then((productTags) => {
//       // get list of current tag_ids
//       const productTagIds = productTags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newProductTags = req.body.tagIds
//         .filter((tag_id) => !productTagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const productTagsToRemove = productTags
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: productTagsToRemove } }),
//         ProductTag.bulkCreate(newProductTags),
//       ]);
//     })
//     .then((updatedProductTags) => res.json(updatedProductTags))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

// router.delete('/:id', async (req, res) => {
//   // delete one product by its `id` value
//   try{
//     const deleteProduct = await Product.destroy({
//         where:{
//             id:req.params.id
//         }
//     })
//     if(deleteProduct){
//         return res.json(deleteProduct)
//     } else {
//         return res.status(404).json({msg:"cannot delete non-existing product"})
//     }
// }catch(err){
//     console.log(err);
//     res.status(500).json({
//         msg:"an error occurred",
//         err:err
//     })
// }
// });

module.exports = router;
