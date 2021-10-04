export interface IUsuario {
    cpf?: string;
    nome: string;
    senha: string;
    descricao: string;
    foto: string;
    dtCadastro: Date;
    tema: number;
    status: number;
    contaStatus: number;
    email: string;
    telefoneFixo: string;
    telefoneCelular: string; 
}