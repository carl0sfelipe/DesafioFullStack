import React, { useState } from 'react';
import axios from 'axios';

const AtualizarFornecedor = ({ supplierId, companies }) => {
    const [expanded, setExpanded] = useState(false);
    const [pessoaFisica, setPessoaFisica] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const updateSupplier = async () => {
        const data = pessoaFisica
            ? {
                nome,
                cpf,
                rg,
                email,
                cep,
                data_de_nascimento: dataNascimento,
                empresa: selectedCompany,
            }
            : {
                nome,
                cnpj,
                email,
                cep,
                empresa: selectedCompany,
            };

        try {
            const response = await axios.put(
                `https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/atualizar-fornecedor/${supplierId}`,
                data
            );
            alert('Fornecedor atualizado com sucesso');
        } catch (error) {
            alert('Erro ao atualizar o fornecedor');
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={toggleExpand}>{expanded ? 'Fechar' : 'Atualizar'}</button>
            {expanded && (
                <div>
                    <label>
                        Pessoa Física:
                        <input
                            type="checkbox"
                            checked={pessoaFisica}
                            onChange={(e) => setPessoaFisica(e.target.checked)}
                        />
                    </label>
                    <br />
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        CEP:
                        <input
                            type="text"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Empresas:
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="">Selecione uma empresa</option>
                            {companies.map((empresa) => (
    <option key={empresa.id} value={empresa.id}>{empresa.nomeFantasia}</option>
    ))}
                        </select>
                    </label>
                    <br />
                    {pessoaFisica ? (
                        <>
                            <label>
                                Data de Nascimento:
                                <input
                                    type="date"
                                    value={dataNascimento}
                                    onChange={(e) => setDataNascimento(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                RG:
                                <input
                                    type="text"
                                    value={rg}
                                    onChange={(e) => setRg(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                CPF:
                                <input
                                    type="text"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </label>
                            <br />
                        </>
                    ) : (
                        <label>
                            CNPJ:
                            <input
                                type="text"
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                            />
                        </label>
                    )}
                    <br />
                    <button onClick={updateSupplier}>Atualizar Fornecedor</button>
                </div>
            )}
        </div>
    );
};

export default AtualizarFornecedor;
