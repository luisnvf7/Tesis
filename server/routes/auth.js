const { Router } = require("express");
const router = Router();
const pool = require("../db");

const { genSaltSync, hashSync, compare } = require("bcryptjs");

const passport = require('passport')


//Registra a un usuario en la base de datos
router.post("/registro", async (req, res) => {
  const {
    username,
    password,
    name,
    state,
    isBussines,
    pdf_url
  } = req.body;

  console.log("USER", req.body)

  // if ( isBussines ) {

    // try {
    //   /* Chequear si la empresa existe */
    //   const checkUser = await pool.query(
    //    "SELECT username_business from business WHERE username_business = $1",
    //    [username]
    //  );
  
    //  if (checkUser.rows.length !== 0)
    //  return res.status(422).json({ message: "Usuario ya existente" });
  
    //   /* Encriptacion de contraseña */
    //   const salt = genSaltSync(10);
    //   const hashedPassword = hashSync(password, salt);
  
    //   /* Ingreso de usuario en la base de datos */
    //   const newUser = await pool.query(
    //     "INSERT INTO business (username_business, rubro_id, nombre, password, estado, isbussines) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    //     [
    //       username,
    //       rubro_id,
    //       name,
    //       hashedPassword,
    //       state,
    //       isBussines
    //     ]
    //   );
  
    //   passport.authenticate('local', (err, user, info) => {
      
    //    if(user) {
    //      req.login(user, () => {
    //        return res
    //        .status(200)
    //        .json({
    //          message: "Usuario registrado satisfactoriamente",
    //          user: newUser.rows[0],
    //        })
    //      })
    //    } 
    //  })(req, res)

    // } catch (err) {

    //   console.log("ERROR", err)
    // }


  // } else {

    try {
      /* Chequear si el usuario existe */
      const checkUser = await pool.query(
        "SELECT username_freelancer from freelancerUsuario WHERE username_freelancer = $1",
        [username]
      );
  
      if (checkUser.rows.length !== 0)
        return res.status(422).json({ message: "Usuario ya existente" });
  
      /* Encriptacion de contraseña */
      const salt = genSaltSync(10);
      const hashedPassword = hashSync(password, salt);
  
      /* Ingreso de usuario en la base de datos */
      const newUser = await pool.query(
        "INSERT INTO freelancerUsuario (username_freelancer, nombre_completo, password, estado, isbussines, pdf_url) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          username,
          name,
          hashedPassword,
          state,
          isBussines,
          pdf_url
        ]
      );
  
      // delete newUser.rows[0].password
  
      passport.authenticate('local', (err, user, info) => {
     
        if(user) {
          req.login(user, () => {
            return res
            .status(200)
            .json({
              message: "Usuario registrado satisfactoriamente",
              user,
            })
          })
        } 
      })(req, res)
  
      
    } catch (err) {
      console.log("ERROR", err);
    }
  //}

});


router.post("/login", async (req, res) => {

  passport.authenticate('local', (err, user, info) => {
   
    if(user) {
      req.login(user, () => {
        return res.status(200).json({message: "Usuario logeado satisfactoriamente", user });
      })
    } else {
      return res.status(422).json({ message : info.message })
    }

  })(req, res)


});

router.get('/logout', (req, res) => {

  req.logout()

  return res.status(200).json({ msg: 'Sesion cerrada exitosamente' })
})


module.exports = router;
