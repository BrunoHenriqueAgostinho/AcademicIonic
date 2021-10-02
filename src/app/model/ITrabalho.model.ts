export interface ITrabalho {
    codigo_trabalho?: number;
    nome_trabalho: string;
    descricao_trabalho: string;
    arquivo_trabalho: string;
    formatacao_trabalho: string;
    finalizado_trabalho: string;
    dtCriacao_trabalho: Date;
    dtAlteracao_trabalho: Date;
    dtPublicacao_trabalho: Date;
    avaliacao_trabalho: number;
    Tb_Modelo_codigo_modelo: number;
    Tb_Instituicao_cnpj_instituicao: number;
}