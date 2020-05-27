export interface Componente {
    icon: string;
    nombre: string;
    redirectTo: string;
}

export interface Tallas {
    id: number;
    descrip: string;

}

export interface EmpList{
    isChecked: boolean;
    idtalv: number;
    descripv: string;
    idtal: number;
    descrip: string;
    Cantidad: number;
    pro_clasepago: string;
    sectab: number;
    A: number;
    B: number;
    C: number;
    isA: boolean;
    isB: boolean;
    isC: boolean;


}


export interface Prioridad {
    ID: number;
    Planta: number;
    CodPed: string;
    Ped: string;
    detpedido: string;
    CodProd: string;
    pro_clasepago: string;
    tal_codigo: string;
    columna: string;
    prioridad: string;
    MASTERS_PROGRAMADOS: string;
    pedido: string;
    dpe_codprod: string;
    pro_desesp: string;
    Cliente: string;
    Descri: string;
}

export interface Colum {
    id: string;
    descri: string;
}
