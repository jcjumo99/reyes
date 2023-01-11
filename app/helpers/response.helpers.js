const responseHelpers = {};
responseHelpers.success=(message, data ,code)=>{
    return{
        status:true,
        message,
        data,
        code
    };
};
responseHelpers.error = (message,data,code)=>{
    return{
        status:false,
        message,
        data,
        code,
        warning:'',
        error: ''
    }
}

// responseHelpers.error =(message,res)=>{
//     res.status(400).json({
//         status:'error',
//         message,
//     })
// }
module.exports = responseHelpers;