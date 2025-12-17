import Freelancer from "../models/Freelancer.js";

export const fetchFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({ userId: req.params.id });
    res.status(200).json(freelancer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFreelancer = async (req, res) => {
  try {
    const { freelancerId, updateSkills, description } = req.body;
    const freelancer = await Freelancer.findById(freelancerId);

    let skills = updateSkills.split(",");
    freelancer.skills = skills;
    freelancer.description = description;

    await freelancer.save();
    res.status(200).json(freelancer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
