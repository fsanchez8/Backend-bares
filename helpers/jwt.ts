import jwt from "jsonwebtoken";
import { SECRETKEY } from '../environments/environments';


export const generarJWT = (
  uid: string = "",
  primerNombre: string,
  primerApellido: string
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      primerNombre,
      primerApellido,
    };

    jwt.sign(
      payload,
      SECRETKEY,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        console.log(err);
        if (err) {
          reject("No se pudo generar el token");
        } else {
          return resolve(token);
        }
      }
    );
  });
};
