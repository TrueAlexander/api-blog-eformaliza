import jwt from 'jsonwebtoken'

 const checkAuth = (req, res, next) => {

  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {

      try {
        const decoded = jwt.verify(token, 'secret')

        req.userId = decoded._id
        next()
      } catch (e) {

        return res.status(403).json({
          message: 'Access not permitted',
        })

      }
  } else {
    return res.status(403).json({
      message: 'Access not permitted',
    })
  }
  // const token = req.headers.cookie 
  // console.log(token)
  // if (!token) return res.status(401).json({
  //   message: "You are not authenticated"
  // })
  // try {
  //   const decoded = jwt.verify(token.slice(13), 'secret')
  //   //if the token is correct then
  //   req.userId = decoded._id
  //   req.isAdmin = decoded.isAdmin
  //   //and go to next function
  //   next()
  // } catch (err) {
  //   return res.status(403).json({
  //     message: "Access not permitted!"
  //   })
  // }
}

export default checkAuth