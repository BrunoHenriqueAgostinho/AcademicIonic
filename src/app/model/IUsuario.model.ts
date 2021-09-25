export interface IUsuario {
    cpf?: number;
    nome: string;
    senha: string;
    descricao: string;
    foto: string;
    dtCadastro: Date;
    tema: number;
    status: number;
    codigoContato: number;
    email: string;
}