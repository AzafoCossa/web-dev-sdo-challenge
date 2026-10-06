import { http, HttpResponse, delay } from "msw";
import { saveRequests, loadRequests } from "./database";
import {type RequestModel} from "../models/requestModel"

const env = import.meta.env;
const baseUrl = env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/requests`, async ({ request }) => {
    await delay(1000);

    const url = new URL(request.url);

    const q = url.searchParams;
    const search = q.get("search") ?? "";

    const needle = search.trim().toLocaleLowerCase();
    const items = loadRequests().filter((r) => {
      return (
        r.title.toLocaleLowerCase().includes(needle) ||
        r.requesterName.toLocaleLowerCase().includes(needle)
      );
    });

    let page = 1;
    let pageSize = 10;
    const total = items.length;
    const totalPages = total == 0 ? 0 : Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;

    return HttpResponse.json({
      items: items.slice(start, start + pageSize),
      page,
      pageSize,
      total,
      totalPages,
    });
  }),

  http.get(`${baseUrl}/requests/:requestId`, async ({ request, params }) => {
    await delay(1000);

    const id = String(params.requestId);
    const regularExpression = /^REQ-[0-9]{4,}$/;
    const found = regularExpression.test(id)
      ? loadRequests().find((r) => r.id === id)
      : undefined;

    return found
      ? HttpResponse.json({
          status: "OK",
          found,
        })
      : HttpResponse.json(
          {
            error: "Not Found",
          },
          { status: 404 },
        );
  }),

  http.post(`${baseUrl}/requests`, async ({ request }) => {
    const body = await request.json();
    const input = body as Record<string, string>;

    const all = loadRequests();

    const lastNumber = all.reduce((max, r) => {
      const n = Number(r.id.replace("REQ-", ""));
      return n > max ? n : max;
    }, 999);

    const now = new Date().toLocaleString();
    const newRequest: RequestModel = {
      id: `REQ-${lastNumber + 1}`,
      requesterEmail: input.email,
      requesterName: input.name,
      description: input.description,
      category: input.category,
      priority: input.priority,
      title: input.title,
      createdAt: now,
      updatedAt: now,
    };

    saveRequests([newRequest, ...all]);

    return HttpResponse.json({
      status: "created",
      data: JSON.stringify(newRequest),
    });
  }),
];