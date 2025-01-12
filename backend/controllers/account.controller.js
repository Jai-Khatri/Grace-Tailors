import AdminAccount from "../models/account.model.js";

export const handleLogin = async(req, res) => {
    const {email, password} = req.body;

    try {
        
    const Check = await AdminAccount.findOne({email: email , password: password})

    if(Check){
        return res.json(Check)
    }else{
        return res.status(401).json({message: "Invalid credentials!!!" , error:error.message})
    }
    

    } catch (error) {
        console.log("Error in handleLogin controller!!! " , error.message)
        res.json({message: "Server Error!!!" , error:error.message})    
    }
}

export const createAdmin = async(req , res) => {
    const {email , password} = req.body;

   try {
    const accountCreated = await AdminAccount.create({email: email , password: password})

    if(accountCreated){
        return res.json({messsage: "Account created successfully!!!" , accountCreated})
    }
   } catch (error) {
     console.log("Error in createAdmin controller!!! " , error.message)
     res.json({message: "Server errro!!!" , error: error.message})
   }

}