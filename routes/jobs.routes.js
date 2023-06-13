const express = require("express");
const Job = require("../model/job.model");
const router = express.Router();

// Route for posting a job
router.post("/jobs", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to post job", error });
  }
});

// Route for fetching jobs with filtering, sorting, search, and pagination
router.get("/jobs", async (req, res) => {
  try {
    const { role, sortBy, page, limit } = req.query;

    const filter = {};
    if (role) {
      filter.role = role;
    }
    const sort = {};
    if (sortBy === "date") {
      sort.postedAt = -1;
    }
    const skip = (Number(page) - 1) * Number(limit); 
    const jobs = await Job.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
});

// Route for searching jobs based on tech stack
router.get("/jobs/search", async (req, res) => {
    try {
      const { techStack } = req.query;
      const regex = new RegExp(techStack, "i"); 
  
      const jobs = await Job.find({ language: regex });
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to search jobs", error });
    }
  });
module.exports = router;