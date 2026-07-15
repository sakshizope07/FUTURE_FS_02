const express = require("express");
const mongoose = require("mongoose");
const Lead = require("./models/Lead");

const app = express();
app.use(express.json());
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/crmDB")
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Hello Sakshi! Your Express Server is running 🚀");
});
app.post("/api/leads", async (req, res) => {

    try {

        const lead = new Lead(req.body);

        await lead.save();

        res.status(201).json({
            message: "Lead Saved Successfully",
            lead
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
app.get("/api/leads", async (req, res) => {

    try {

        const leads = await Lead.find();

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.get("/api/leads/:id", async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        res.status(200).json(lead);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.put("/api/leads/:id", async (req, res) => {

    try {

        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedLead);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
app.delete("/api/leads/:id", async (req, res) => {

    try {

        await Lead.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Lead Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});