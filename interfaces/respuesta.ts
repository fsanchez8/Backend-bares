export default class RespuestaGeneral<T> {
    public codigo!: T | null;
    public exception!: T | null;
    public message!: T;
    public response!: T;

    constructor(){
        this.codigo =  null;
        this.exception =  null;
    }
}

export default interface MysqlErrorResponse<T> {
    errno: number,
    sqlMessage: string,
    sqlState: string,
    fatal: boolean
}

