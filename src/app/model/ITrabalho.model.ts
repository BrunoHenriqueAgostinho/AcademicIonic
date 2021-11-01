export interface ITrabalho {
    codigo?: number;
    nome: string;
    descricao: string;
    arquivo: string;
    margemDireita: string;
    margemEsquerda: string;
    margemTopo: string;
    margemBaixo: string;
    finalizado: number;
    dtCriacao: Date;
    dtAlteracao: Date;
    dtPublicacao: Date;
    avaliacao: number;
    modelo: number;
    cnpj: string;
}