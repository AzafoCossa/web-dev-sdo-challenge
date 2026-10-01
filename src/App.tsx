import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  title: string;
  description: string;
  category: string;
  priority: string;
  name: string;
  email: string;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

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
          <button type="submit" className="btn btn-lg btn-primary">
            Salvar
          </button>
        </div>
      </form>
      </div>
    </>
  );
}

export default App;
