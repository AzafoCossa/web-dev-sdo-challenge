import { http, HttpResponse, delay } from "msw";
import { saveRequests, loadRequests } from "./database";
import {type RequestModel} from "../models/requestModel"

const env = import.meta.env;
const baseUrl = env.VITE_API_BASE_URL;

export const handlers = [
    http.get(`${baseUrl}/requests`, async () => {
        await delay(1000);
        
        const items = loadRequests();

        let page = 1;
        let pageSize = 10;
        const total = items.length
        const totalPages = total == 0 ? 0 : Math.ceil(total / pageSize);
        const start = (page - 1) * pageSize;

        return HttpResponse.json({
            items: items.slice(start, start + pageSize),
            page,
            pageSize,
            total,
            totalPages
        });
    }),

    http.post(`${baseUrl}/requests`, async ({request}) => {
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
]