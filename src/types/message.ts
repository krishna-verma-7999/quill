import { AppRouter } from "@/trpc";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
// advance TRPC feature :- getting the type of all data that we are getting from trpc

type Messages = RouterOutput["getFileMessages"]["messages"];

type OmitText = Omit<Messages[number], "text">;
// Omit is type-script utility function

type ExtendedText = {
  text: string | JSX.Element;
};

export type ExtendedMessage = OmitText & ExtendedText;
