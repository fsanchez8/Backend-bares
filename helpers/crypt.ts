import  bcryptjs  from 'bcryptjs'

export const encryptPassword = (password: string)=>{
    const salt =  bcryptjs.genSaltSync(10);
    return  bcryptjs.hashSync(password, salt); 
}

export const decryptPassword = (password: string, salt:string)=>{
    return  new Promise((resolve, reject )=>{
        const pass = bcryptjs.compareSync(password, salt); 
        if(pass){
            resolve(true);
        }else {
            resolve(false)
        }
        reject();
    })
}

