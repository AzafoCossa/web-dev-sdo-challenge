import { useEffect, useState } from "react";
import api from "../api";
import type { RequestModel } from "../models/requestModel";
import { Link, useNavigate } from "react-router";
import Pagination from "../components/Pagination";
import { useForm, type SubmitHandler } from "react-hook-form";

interface RequestsPage {
  items: RequestModel[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface SearchForm {
  search: string;
}

export function RequestsListPage() {
  const { handleSubmit, register } = useForm<SearchForm>();
  const [requestsData, setRequestsData] = useState<RequestsPage | null>(null);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState<RequestsPage | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const viewRequest = (requestId: string) => {
    navigate("/view-request/" + requestId);
  };

  const onSubmit: SubmitHandler<SearchForm> = async (data) => {
    api
      .get("/requests", {
        params: data,
      })
      .then((res) => {
        setRequestsData(res.data);
        setPageData(res.data);
      });
  };

  useEffect(() => {
    api
      .get<RequestsPage>("/requests", { params: { page, pageSize: 10 } })
      .then((res) => {
        setRequestsData(res.data);
        setPageData(res.data);
      })
      .catch((err) => console.error("Error fetching requests:", err))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p>Carregando...</p>;
  return (
    <>
      <div>
        <Link className="btn btn-warning" to="/create-request">
          {"Criar nova requisicao"}
        </Link>
      </div>
      <div className="row mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Procurar pelo titulo/requerente"
                {...register("search")}
              />
            </div>
            {/* <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Procurar pelo titulo/requerente"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Procurar pelo titulo/requerente"
                />
              </div> */}
            <div className="col-md-1">
              <button className="btn btn-primary">Procurar</button>
            </div>
          </div>
        </form>
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Lista de requisicoes</h6>
        <div className="div table-responsive">
          <table className="table table-striped table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Titulo</th>
                <th scope="col">Descricao</th>
                <th scope="col">Nome do requerente</th>
                <th scope="col">Email do requerente</th>
                <th scope="col">Data da requisicao</th>
                <th scope="col">Data da ultima atualizacao</th>
              </tr>
            </thead>
            <tbody>
              {requestsData?.items.length === 0 && (
                <p>Nenhuma requisição encontrada.</p>
              )}
              {requestsData?.items.map((data) => (
                <tr key={data.id} onClick={() => viewRequest(data.id)}>
                  <th scope="row">{data.id}</th>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.requesterName}</td>
                  <td>{data.requesterEmail}</td>
                  <td>{data.createdAt}</td>
                  <td>{data.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pageData && (
          <Pagination
            page={pageData.page}
            totalPages={pageData.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  );
}