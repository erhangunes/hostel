"use client";
import React, { useEffect } from "react";
import { useLoading } from "../../context/LoadingContext";
import { fetchInterceptor } from "../../libs/Api/Interceptor";

function Loading() {
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchInterceptor.setLoadStateFunction(setLoading);
  }, [setLoading]);

  return null;
}

export default Loading;
