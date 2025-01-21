import axios from "axios";

export const updateDB = async (req, res) => {
    console.log("Triggered");
  
    try {
    //   console.log("Request Body:", req.body);
    //   const { meta } = req.body;
  
    //   if (!meta || !meta.resourceId) {
    //     return res.status(400).json({ message: "Invalid request body" });
    //   }
  
    //   const { resourceId } = meta;

    //with testing webhook.site
     // Retrieve loanId from request (adjust based on how it's sent)
     const loanId = req.params.loanId; // or req.body.loanId or req.params.loanId
    
     if (!loanId) {
       return res.status(400).json({ message: "loanId is required" });
     }
  
      // Obtain OAuth token
      const tokenResponseData = await axios.post(
        "https://api.elliemae.com/oauth2/v1/token",
        new URLSearchParams({
          grant_type: "password",
          username: "chrisj@encompass:TEBE11371233",
          password: "loAIcrm1994!",
          client_id: "fw5t9js",
          client_secret: "^TPShPA0#fi4jit7dJlEqBJl#IsK6bPCuRZONV7e1CJty0w10JnRabA@SaGUq5!q",
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
  
      const accessToken = tokenResponseData.data.access_token;
  
      if (!accessToken) {
        return res.status(500).json({ message: "accessToken is missing" });
      }
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      // Make a GET request to the Ellie Mae API
      const response = await axios.get(
        `https://api.elliemae.com/encompass/v3/loans/${loanId}`,
        config
      );
  
      console.log("Ellie Mae API Response:", response.data);
  
      // Update loan details in DB
      await Borrower.updateOne(
        { encompassLoanId: resourceId },
        { $set: { loanStatus: "Updated" } }
      );
  
      console.log("Loan updated successfully:", resourceId);
      res.status(200).json({ message: "Loan updated successfully!" });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Failed to update loan details", error: error.message });
    }
  };
  