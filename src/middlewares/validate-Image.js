
export const validateFieldImage = (...fields) => {
    return (req = request, res = response, next) => {
        for (let field of fields) {
            try {
                if(!req.files[field]){
                    return res.status(400).json({
                        msg: `The field ${field} is required`
                    })
                }
            } catch (error) {
                return res.status(400).json({
                    msg: `The field ${field} is required`
                })
            }
        }
        next()
    }
}