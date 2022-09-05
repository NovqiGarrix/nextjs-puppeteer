// src/components/ResultComponent.tsx

import { Fragment, FunctionComponent } from "react";

import { FaceFrownIcon, BoltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { IFetchingState } from "../types";
import getDomain from "../utils/getDomain";

interface IResultComponentProps {
  state: IFetchingState;
  siteURL: string;
}

const ResultComponent: FunctionComponent<IResultComponentProps> = (props) => {
  const {
    state: { isLoading, error, imageSrc },
    siteURL,
  } = props;

  return (
    <Fragment>
      {!isLoading ? (
        <Fragment>
          {imageSrc && (
            <div className="mt-10">
              <Image
                src={imageSrc}
                alt={siteURL}
                width={1920}
                height={1080}
                objectFit="cover"
                className="rounded-lg"
              />
              <Link passHref href={siteURL} prefetch={false}>
                <a
                  target="_blank"
                  className="text-sm text-gray-500 font-poppins italic"
                >
                  {getDomain(siteURL)}
                </a>
              </Link>
            </div>
          )}

          {error && (
            <div
              className="w-full flex flex-col space-y-5 items-center justify-center"
              style={{ height: 300 }}
            >
              <div className="flex items-center">
                <FaceFrownIcon className="w-14 h-14 text-red-600" />
                <FaceFrownIcon className="w-14 h-14 text-red-600" />
              </div>

              <div className="flex flex-col divide-y divide-gray-200 w-full">
                <span className="text-base text-red-500 pb-2">
                  Error: {error}.
                </span>
              </div>
            </div>
          )}
        </Fragment>
      ) : (
        <div
          className="w-full flex flex-col space-y-2 items-center justify-center animate-pulse"
          style={{ height: 720 }}
        >
          <BoltIcon className="w-10 h-10 text-indigo-600 animate-bounce" />
          <span className="text-base text-gray-500">Getting Image...</span>
        </div>
      )}
    </Fragment>
  );
};

export default ResultComponent;
