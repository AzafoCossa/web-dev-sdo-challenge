import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "./api";
import type { RequestModel } from "./models/requestModel";

type FormFields = {
  title: string;
  description: string;
  category: string;
  priority: string;
  name: string;
  email: string;
};

interface RequestsPage {
  items: RequestModel[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

function App() {
  const [requestsData, setRequestsData] = useState<RequestsPage | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolver) => setTimeout(resolver, 1000));
    try {
      const response = await api.post("/requests", data);
      console.log("Response from POST /requests:", response.data);
    } catch (error) {
      console.error("Error saving request:", error);
    }
  };

  useEffect(() => {
    api
      .get<RequestsPage>("/requests")
      .then((res) => setRequestsData(res.data))
      .catch((err) => console.error("Error fetching requests:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <form
        className="needs-validation"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h4>Crear nova requisicao</h4>
        <hr />
        <div className="row my-4">
          <div className="col-md-6">
            <label htmlFor="name">Digite o seu nome</label>
            <input
              type="text"
              className={`form-control mt-2 ${errors.name ? "is-invalid" : ""}`}
              placeholder="Digite o seu nome"
              id="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="invalid-feedback">O campo nome é obrigatório</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="email">Digite o seu email</label>
            <input
              type="text"
              className={`form-control mt-2 ${errors.email ? "is-invalid" : ""}`}
              placeholder="Digite o seu email"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="invalid-feedback">Digite um email válido</div>
            )}
          </div>
        </div>

        <div className="row my-4">
          <div>
            <label htmlFor="title">Digite o titulo</label>
            <input
              type="text"
              className={`form-control mt-2 ${errors.title ? "is-invalid" : ""}`}
              placeholder="Digite o titulo"
              id="title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <div className="invalid-feedback">
                O campo titulo é obrigatório
              </div>
            )}
          </div>
        </div>

        <div className="row my-4">
          <div className="col-md-6">
            <label htmlFor="priority">Digite a urgencia</label>
            <input
              type="text"
              className={`form-control mt-2 ${errors.priority ? "is-invalid" : ""}`}
              placeholder="Digite a urgencia"
              id="priority"
              {...register("priority", { required: true })}
            />
            {errors.priority && (
              <div className="invalid-feedback">
                O campo urgencia é obrigatório
              </div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="category">Digite a categoria</label>
            <input
              type="text"
              className={`form-control mt-2 ${errors.category ? "is-invalid" : ""}`}
              placeholder="Digite a categoria"
              id="category"
              {...register("category", { required: true })}
            />
            {errors.category && (
              <div className="invalid-feedback">
                O campo categoria é obrigatório
              </div>
            )}
          </div>
        </div>

        <div className="row my-4">
          <div>
            <label htmlFor="description">Digite a descricao</label>
            <textarea
              className={`form-control mt-2 ${errors.description ? "is-invalid" : ""}`}
              placeholder="Digite a descricao"
              id="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <div className="invalid-feedback">
                O campo descricao é obrigatório
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-lg btn-primary"
          >
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>

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
                <tr key={data.id}>
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
      </div>
    </>
  );
}

export default App;
