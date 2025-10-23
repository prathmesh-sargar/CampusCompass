import axios from "axios";

export const getOpenSourceIssues = async (req, res) => {
  try {
    const { tech = "javascript", status = "open", perPage = 10, page = 1 } = req.query;

    const response = await axios.get(`https://www.openradar.live/api/github`, {
      params: { tech, status, perPage, page },
    });
    // Send the data back to your frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching open-source issues:", error.message);
    res.status(500).json({ message: "Failed to fetch issues", error: error.message });
  }
};

// https://api.github.com/search/issues?q=language:javascript