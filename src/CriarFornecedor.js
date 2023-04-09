import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CriarFornecedor = () => {
  const [pessoaFisica, setPessoaFisica] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [empresas, setEmpresas] = useState([]);
  const [dataNascimento, setDataNascimento] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState('');

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get('https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/pegar-empresa', {
          headers: {
            'Content-Type': 'application/json',
            // Adicione outros cabeçalhos, se necessário
          },
        });
       // console.log(response.data)
        setEmpresas(response.data.result.empresas);
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };
  
    fetchEmpresas();
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataPj = {
    nome:nome,
    cnpj:cnpj,
    email:email,
    empresas:selectedEmpresa,
    }

    const dataPf = {
        nome:nome,
        cpf:cpf,
        rg:rg,
        email:email,
        data_de_nascimento:dataNascimento,
        empresas:selectedEmpresa,
        }

    try {
let data = {};
if(pessoaFisica)
{
    data = dataPf;
} else {
    data = dataPj;
}


      const response = await axios.post('https://dev168084.service-now.com/api/x_802938_backend_0/empresa_fornecedor_api/criar-fornecedor', data,{
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Adicione outros cabeçalhos, se necessário
        },
      });

      console.log('Fornecedor criado com sucesso!', response.data);
    } catch (error) {
      console.error('Erro ao criar fornecedor:', error);
    }
  };

  return (
    <div>
    <h1>Criar Fornecedor</h1>
    <form onSubmit={handleSubmit}>
    <label>
    Pessoa Física:
    <input type="checkbox" checked={pessoaFisica} onChange={(e) => setPessoaFisica(e.target.checked)} />
    </label>
    <br />
    <label>
    Nome:
    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
    </label>
    <br />
    <label>
    Email:
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>
    <br />
    <label>
    CEP:
    <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
    </label>
    <br />
    <label>
    Empresas:
    <select id="selectedEmpresa" value={selectedEmpresa} onChange={(e) => setSelectedEmpresa(e.target.value)}>
    <option value="">Nenhum</option>
    {empresas.map((empresa) => (
    <option key={empresa.id} value={empresa.id}>{empresa.nomeFantasia}</option>
    ))}
    </select>
    </label>
    <br />
    <label>
    Data de Nascimento:
    <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
    </label>
    <br />
    <label>
    RG:
    <input type="text" value={rg} onChange={(e) => setRg(e.target.value)} />
    </label>
    <br />
    <label>
    CPF:
    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
    </label>
    <br />
    <label>
    CNPJ:
    <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
    </label>
    <br />
    <button type="submit">Criar Fornecedor</button>
    </form>
    </div>
    );
    };
    
    export default CriarFornecedor;
    
    
    
    