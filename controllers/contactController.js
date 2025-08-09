const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModule.js");

// const { get } = require("../routes/contactRoute");

//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

//@desc Get {id} contacts
//@route GET /api/contacts
//@access Private
const getContactsid = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(201).json(contact);
})

//@desc create contacts
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async(req, res) => {
    console.log("This is req.body" , req.body);
    const{name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact  = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(200).json(contact);
})

//@desc Update contacts
//@route put /api/contacts
//@access Private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User not authorized");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateContact);
})

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const deleteContact = asyncHandler(async(req, res) => {

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const removeContact = await Contact.findByIdAndDelete(req.params.id);
    
    res.status(200).json(removeContact);
})

module.exports = {
    getContacts,
    getContactsid,
    createContact,
    updateContact,
    deleteContact
};