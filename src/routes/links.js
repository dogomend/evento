const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
//console.log('paso x aqui');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async(req, res) => {
    const { title, url, description, lugar, precio, fecha, destacado } = req.body;
    const newLink = {
        title,
        url,
        description,
        lugar,
        precio,
        fecha,
        destacado,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO event set ?', [newLink]);
    req.flash('success', 'Evento Saved Successfully');
    res.redirect('/links');
});
router.get('/total', async(req, res) => {
    //console.log('kjuuhgfdsj');
    const event = await pool.query('SELECT * FROM event');
    res.render('links/total', { event });
});

router.get('/detalle/:id', async(req, res) => {
    //console.log('kjuuhgfdsj');
    const { id } = req.params;
    const event = await pool.query('SELECT * FROM event WHERE user_id = ?', [id]);
    console.log('event es : ', event);
    console.log('event[0] es : ', event[0].title);
    console.log('event.title es : ', event.title);


    res.render('links/detalle', {
        event: {
            title: event[0].title,
            description: event[0].description,
            lugar: event[0].lugar,
            url: event[0].url,
            precio: event[0].precio,
            fecha: event[0].fecha,
            created_at: event[0].created_at
        }
    });
});

router.get('/comparte/:id', async(req, res) => {
    const { id } = req.params;
    const event = await pool.query('SELECT * FROM event WHERE user_id = ?', [id]);
    res.render('links/comparte', {
        event: {
            title: event[0].title
        }
    });
});

router.get('/', isLoggedIn, async(req, res) => {

    const event = await pool.query('SELECT * FROM event WHERE user_id = ?', [req.user.id]);
    res.render('links/list', { event });
});


router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM event WHERE ID = ?', [id]);
    req.flash('success', 'Evento Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const event = await pool.query('SELECT * FROM event WHERE id = ?', [id]);
    res.render('links/edit', { event: event[0] });
});

router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { title, url, description, lugar, precio, fecha, destacado } = req.body;
    const newLink = {
        title,
        url,
        description,
        lugar,
        precio,
        fecha,
        destacado,
    };
    await pool.query('UPDATE event set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Evento Guardado satisfactoriamente');
    res.redirect('/links');
});

module.exports = router;