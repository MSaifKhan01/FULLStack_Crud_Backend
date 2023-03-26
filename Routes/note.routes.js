const express=require("express")
const noteRouter= express.Router()
const {NoteModel}=require("../Models/note.model")
const jwt=require("jsonwebtoken")


/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         sub:
 *           type: string
 *         userID:
 *           type: string
 */

/**
 * @swagger
 * /note:
 *   get:
 *     summary: This route is get all the notes from database.
 *     responses:
 *       200:
 *         description: The list of all the notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */

noteRouter.get('/',async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jammi")
    try{
        if(decoded){
            const notes=await NoteModel.find({"userID":decoded.userID})
            res.status(200).send(notes)
        }
    }catch(err){
        res.status(400).send({"msz":err.message})
    }
})

/**
 * @swagger
 * /note/add:
 *  post:
 *      summary: To post a new note to the database
 *      tags: [Notes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *      responses:
 *          200:
 *              description: The note was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Note'
 *          500:
 *              description: Some server error
 */

noteRouter.post("/add", async(req,res)=>{
    try{
    const note=new NoteModel(req.body)
    await note.save()
    res.status(200).send({"Msz":"A New Note has been added"})
    }catch(err){
        res.status(400).send({"msz":err.message})
    }
})
/**
 * @swagger
 * /note/update:
 *   put:
 *     summary: To update a note in the database
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: The note was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: The specified user ID does not exist.
 *       500:
 *         description: Some server error
 */
noteRouter.put("/update/:Id", async (req, res) => {
    let { Id } = req.params

    let newbody = req.body

    try {
        await NoteModel.findByIdAndUpdate({ _id: Id }, newbody)
        res.send({ "msg": " Movie dataupdated succesfully" })
    } catch (error) {
        res.send({ "error": "some error occured while updating" })
        console.log(error)
    }
})
/**
* @swagger
* /note/delete:
*   delete:
*     summary: To delete a user from the database
*     tags: [Notes]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Note'
*     responses:
*       200:
*         description: The note was successfully deleted.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Note'
*       404:
*         description: The specified user ID does not exist.
*       500:
*          description: Some server error
*/
noteRouter.delete("/delete/:Id", async (req, res) => {
    let  {Id } = req.params
    try {
        await NoteModel.findByIdAndDelete({ _id: Id })
        res.send({ "message": "Deleted succesfully" })
    } catch (error) {
        res.send({ "error": "some error occured while deleting" })
    }
})




noteRouter.patch("/update",async(req,res)=>{

})
module.exports={
    noteRouter
}