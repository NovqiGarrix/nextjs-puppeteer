// src/pages/index.tsx

import { FormEvent, useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";

import ResultComponent from "../components/ResultComponent";
import { IFetchingState } from "../types";

const fetchingStateInit: IFetchingState = {
  imageSrc: null,
  isLoading: false,
  error: null,
};

const Home: NextPage = () => {
  const [siteURL, setSiteURL] = useState("");
  const [fetchingState, setFetchingState] = useState(fetchingStateInit);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!siteURL) return;

    setFetchingState((prev) => ({ ...prev, isLoading: true }));

    try {
      const resp = await fetch(`/api/puppeteer?url=${siteURL}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const { data, msg } = await resp.json();
      setFetchingState((prev) => ({ ...prev, imageSrc: data, error: msg }));
    } catch (error: any) {
      console.info(error.message);
      setFetchingState((prev) => ({
        ...prev,
        error: "An error occured. Please refresh the page!",
      }));
    } finally {
      setFetchingState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <div className="mx-auto my-auto flex items-center justify-center h-screen flex-col space-y-5">
      <Head>
        <title>Nextjs Puppeteer</title>
        <meta name="description" content="Screenshot any Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-indigo-500">
          Find an Image of Any Website
        </h1>

        {siteURL && <ResultComponent state={fetchingState} siteURL={siteURL} />}

        <form
          onSubmit={onSubmit}
          className="flex items-center flex-col space-y-5 mt-10 w-full"
        >
          <input
            type="text"
            value={siteURL}
            onChange={(e) => setSiteURL(e.target.value)}
            placeholder="Paste your website URL here"
            className="rounded-md w-full text-sm"
            autoComplete="on"
          />

          <button
            type="submit"
            className="px-10 py-3 bg-indigo-500 text-sm rounded-full text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search!
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;
