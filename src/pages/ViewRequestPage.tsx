import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import api from "../api";
import type { RequestModel } from "../models/requestModel";

export function ViewRequestPage() {
    const [requestData, setRequestData] = useState<RequestModel | null>(null);
    const [loading, setLoading] = useState(true);

    const params = useParams<{ requestId: string }>();

      useEffect(() => {
    api
        .get<RequestModel>(`/requests/${params.requestId}`)
      .then((res) => setRequestData(res.data.found))
      .catch((err) => console.error("Error fetching requests:", err))
      .finally(() => setLoading(false));
  }, []);

    if (loading) return <p>Carregando...</p>;
    return (
        <>
            <Link to="/" className="btn btn-secondary">Voltar</Link>
            <h1 className="mt-4">{requestData?.title}</h1>
            <p>Requisitado por: {requestData?.requesterName}</p>
            <span>No dia: { requestData?.createdAt}</span>

        </>
    );
}