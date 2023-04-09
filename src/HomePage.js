import React from "react";
import CompanyList from "./CompanyList";
import SupplierList from "./SupplierList.js";
import CriarEmpresa from "./CriarEmpresa.js";
import CriarFornecedor from "./CriarFornecedor";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
        <div>
<CriarEmpresa/>
        </div>
        <div>
            <CriarFornecedor/>
        </div>
      <div>
      <h1>Lista de Empresas</h1>
      <CompanyList/>
      </div>
      <div>
        <h1>Lista de Fornecedores</h1>
        <SupplierList/>
      </div>
    </div>
  );
}

export default HomePage;
