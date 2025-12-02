const Session = require("../models/Session")
const Question = require("../models/Questions")

exports.createSession = async(req, res) => {
    try{
        console.log(req.body);
        const { role, experience, topicsToFocus, description, questions} = req.body;
        const userId = req.user._id

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        const questionDocs = await Question.insertMany(
            questions.map(q => ({
                session: session._id,
                question: q.question,
                answer: q.answer
            }))
        )

        session.questions = questionDocs.map(q => q._id);
        await session.save();

        res.status(201).json({sucess:true,session})

    }catch(error){
        res.status(500).json({success: false, message:`Server Error ${error}`})
    }
}

exports.getMySessions = async(req,res) => {
    try{
        const sessions = await Session.find({ user: req.user._id})
          .sort({createdAt: -1})
          .populate("questions");
        res.status(200).json(sessions)  
    }catch(error){
        console.log(error)
        res.status(500).json({sucess: false, message:"Server Error"})
    }
}

exports.getSessionById = async(req,res) => {
    try{
        const session = await Session.findById(req.params.id)
          .populate({
            path: "questions",
            options: {sort: {isPinned: -1, createdAt: 1}}
          })
          .exec();

        if(!session){
            return res.status(404).json({sucess: false, message: "Session not found"})
        }

        res.status(200).json({sucess:true, session})
    }catch(error){
        res.status(500).json({sucess: false, message:"Server Error"})
    }
}

exports.deleteSession = async(req,res) => {
    try{
        const session = await Session.findById(req.params.id);

        if(!session){
            return res.status(404).json({message:"Session not found"})
        }

        if(session.user.toString() !== req.user.id){
            return res
              .status(401)
              .json({message:"Not authorized to delete this session"})
        }

        await Question.deleteMany({session: session._id});

        await session.deleteOne();

        res.status(200).json({message:"Session deleted successfully"})
    }catch(error){
        res.status(500).json({sucess: false, message:"Server Error"})
    }
}