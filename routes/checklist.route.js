const router = require('express').Router();
let CheckList = require('../Schema/checklist.model');

router.route("/:company").get( (req, res) => {
    CheckList.find()
        .then(checklist => res.json(checklist))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/add/:company_number").post( (req, res) => {
    var company_number = Number(req.params.company_number);
    var apparatus_type = req.body.apparatus_type;
    var apparatus_number = Number(req.body.apparatus_number);
    var date_of_check = Date.parse(req.body.date_of_check);
    var members_that_checked = req.body.members_that_checked;
    var compartments_of_apparatus = req.body.compartments_of_apparatus;

    const newCheckList = new CheckList({
        apparatus_type,
        apparatus_number,
        date_of_check,
        members_that_checked,
        company_number,
        compartments_of_apparatus
    });

    newCheckList.save()
        .then( () => { 
            res.sendStatus(200);
        })
        .catch( (err) => {
            res.sendStatus(400);
            console.error("Error: " + err);
        });
});

router.route("/update/:id").post( (req, res) => {
    CheckList.findById(req.params.id)
        .then( (checklist) => {
            checklist.apparatus_type = req.body.apparatus_type;
            checklist.apparatus_number = Number(req.body.apparatus_number);
            checklist.date_of_check = Date.parse(req.body.date_of_check);
            checklist.members_that_checked = req.body.members_that_checked;
            checklist.company_number = Number(req.body.company_number);
            checklist.compartments_of_apparatus = req.body.compartments_of_apparatus;

            checklist.save()
                .then( () => {
                    res.sendStatus(200);
                })
                .catch( (err) => {
                    res.sendStatus(400);
                    console.error("ERror: " + err);
                });
        })
        .catch( (err) => {
            res.sendStatus(400);
            console.error("Errro: " + err);
        });
});

router.route("/delete/:id").delete( (req, res) => {
    CheckList.findByIdAndDelete(req.params.id)
        .then( () => {
            res.sendStatus(200);
        })
        .catch( (err) => {
            res.sendStatus(400);
            console.error('Error: ' + err);
        });
});

module.exports = router;