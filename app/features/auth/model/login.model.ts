export default class  LoginModel {
    public email!: string
    public contrasena!: string
    public estadoPass!:string
    public p_nombre!:string
    public p_apellido!: string
    public tipo_documento!: string
    public nombre_corto_documento!: string
    public docuemento!: string
    public rol!: string
    public ip_remota!:string
    public intentos_login!: number
    public  online!: number
    public uuid!: string
    public token!: string | unknown
}