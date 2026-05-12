import { ZodError } from "zod";

export function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: err.issues,
      },
    });
  }

  if (err?.name === "CastError") {
    return res.status(400).json({
      error: { code: "BAD_ID", message: "Invalid id format" },
    });
  }

  if (err?.code === 11000) {
    return res.status(409).json({
      error: { code: "DUPLICATE", message: "Duplicate key violation", details: err.keyValue },
    });
  }

  const message = status >= 500 ? "Internal server error" : (err.message || "Request failed");
  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({
    error: {
      code: err.code || "ERROR",
      message,
    },
  });
}

