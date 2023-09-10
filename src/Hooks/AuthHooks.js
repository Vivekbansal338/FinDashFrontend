import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

export async function checkUsername(username) {
  console.log(JSON.stringify(username));
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/checkusername`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export function useCheckUsername() {
  const { mutate, isLoading, error, data } = useMutation({
    mutationFn: (username) => checkUsername(username),
  });

  return { mutate, isLoading, error, data };
}

export async function checkEmail(email) {
  console.log(JSON.stringify(email));
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/checkemail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log(data);
  return data;
}

export function useCheckEmail() {
  const { mutate, isLoading, error, data } = useMutation({
    mutationFn: (email) => checkEmail(email),
  });

  return { mutate, isLoading, error, data };
}
