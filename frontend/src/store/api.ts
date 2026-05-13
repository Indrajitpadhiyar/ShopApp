import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getApiBaseUrl } from "@/src/config/apiBaseUrl";

const baseUrl = getApiBaseUrl();

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token as string | undefined;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Product", "Bill"],
  endpoints: (builder) => ({
    register: builder.mutation<{ user: { id: string; email: string }; token: string }, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    login: builder.mutation<{ user: { id: string; email: string }; token: string }, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),

    listProducts: builder.query<
      { products: any[]; page: number; limit: number; total: number },
      { page?: number; limit?: number; q?: string } | void
    >({
      query: (args) => {
        const page = args?.page ?? 1;
        const limit = args?.limit ?? 20;
        const q = args?.q?.trim();
        const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (q) qs.set("q", q);
        return { url: `/products?${qs.toString()}` };
      },
      providesTags: (result) =>
        result?.products
          ? [
              { type: "Product" as const, id: "LIST" },
              ...result.products.map((p: any) => ({ type: "Product" as const, id: p._id ?? p.id })),
            ]
          : [{ type: "Product" as const, id: "LIST" }],
    }),
    getProduct: builder.query<{ product: any }, string>({
      query: (id) => ({ url: `/products/${id}` }),
      providesTags: (result, _err, id) => [{ type: "Product", id: result?.product?._id ?? id }],
    }),
    createProduct: builder.mutation<{ product: any }, any>({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<{ product: any }, { id: string; patch: any }>({
      query: ({ id, patch }) => ({ url: `/products/${id}`, method: "PATCH", body: patch }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id },
      ],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: (_res, _err, id) => [
        { type: "Product", id: "LIST" },
        { type: "Product", id },
      ],
    }),

    listBills: builder.query<{ bills: any[]; page: number; limit: number; total: number }, { page?: number; limit?: number } | void>({
      query: (args) => {
        const page = args?.page ?? 1;
        const limit = args?.limit ?? 50;
        return { url: `/bills?page=${page}&limit=${limit}` };
      },
      providesTags: (result) =>
        result?.bills
          ? [{ type: "Bill" as const, id: "LIST" }, ...result.bills.map((b: any) => ({ type: "Bill" as const, id: b._id }))]
          : [{ type: "Bill" as const, id: "LIST" }],
    }),
    createBill: builder.mutation<
      { bill: any },
      { customerName?: string; customerPhone?: string; items: { productId: string; name: string; quantity: number; price: number; unit?: string }[] }
    >({
      query: (body) => ({ url: "/bills", method: "POST", body }),
      invalidatesTags: [
        { type: "Bill", id: "LIST" },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useListProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useListBillsQuery,
  useCreateBillMutation,
} = api;

