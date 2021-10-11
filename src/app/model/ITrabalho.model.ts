export interface ITrabalho {
    codigo?: number;
    nome: string;
    descricao: string;
    arquivo: string;
    formatacao: string;
    finalizado: number;
    dtCriacao: Date;
    dtAlteracao: Date;
    dtPublicacao: Date;
    avaliacao: number;
    modelo: number;
    cnpj: string;
}