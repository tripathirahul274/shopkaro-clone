const ProductRoutes = require("express").Router();
const {ProductModule} = require("../models/Signup.models");
const movies = require("../config/db");

ProductRoutes.get("/", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		let sort = req.query.sort || "rating";
		let genre = req.query.genre || "All";
console.log(genre)
		const genreOptions = [
			"Mens",
			"Womens",
			"Kids",
			"New",
			"Fashion",
			"Beauty",
			"Furniture & Electronics",
			"Travel & Holidays",
			"Home",
			"Grocery",
		];
          
		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const movies = await ProductModule.find({ name: { $regex: search, $options: "i" } })
			.where("genre")
			.in([...genre])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await ProductModule.countDocuments({
			genre: { $in: [...genre] },
			name: { $regex: search, $options: "i" },
           
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			genres: genreOptions,
			movies,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});

// ProductRoutes.get("/",async(req,res)=>{
//     const query=req.query
    
        
//     try{
//         const data=await ProductModule.find(query)
//         res.send(data)
//     }
//     catch(err){
//        console.log(err)
//     }
// })



ProductRoutes.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const Posts = new ProductModule(payload);
    await Posts.save();
    res.send("Created Successfully");
  } catch (error) {
    res.send({"mas":"Something went wrong"})
    console.log(error);
  }
});


ProductRoutes.patch("/update/:id",async(req,res)=>{
  const payload=req.body
  const id=req.params.id;
  const note=await ProductModule.findOne({"_id":id})
  const userId_in_note=note.userId;
  const userId_making_req=req.nodu.usrId;

  try{
   if(userId_making_req ===userId_in_note){}
   await ProductModule.findByIdAndUpdate({'_id':id},payload)
   res.send("Updatathe note")
  }
  catch(err){
   console.log(err)
   res.send({"mas":"Something wen wrong"})

  }
 
})

ProductRoutes.delete("/delete/:id",async(req,res)=>{
 const id=req.params.id
 try{
   await ProductModule.findByIdAndDelete({"_id":id})
   res.send("Deleted the note")
 }catch(err){
   console.log(err)
 }
   
})



module.exports= {ProductRoutes}