import express from "express";

const getTestPage = (req, res) => {
    return res.render('test')
}

export default getTestPage