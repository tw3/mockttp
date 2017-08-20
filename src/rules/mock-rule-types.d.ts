import express = require("express");
import { Explainable, Request } from "../types";

// The external interface of a rule, for users to later verify with
export interface MockedEndpoint {
    getSeenRequests(): Promise<Request[]>
}

// The internal representation of the mocked endpoint
export interface MockRule extends Explainable {
    matches: RequestMatcher
    handleRequest: RequestHandler;
    isComplete?: RuleCompletionChecker;

    requests: Request[];
}

export type RequestMatcher = ((request: Request) => boolean) & Explainable;
export type RequestHandler = ((request: Request, response: express.Response) => Promise<void>) & Explainable;

export interface RuleCompletionChecker extends Explainable {
    (this: MockRule): boolean;
}