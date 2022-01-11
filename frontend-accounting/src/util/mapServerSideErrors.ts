import { ErrorOption } from "react-hook-form";

type ErrorType = Record<string, [string]>;

const mapServerSideErrors = (
    err: ErrorType,
    setError: (name: string, error: ErrorOption) => void
) => {
    const errorMap: Record<string, { type: string; message: string }> = {};

    if (typeof err === "object") {
        Object.keys(err).forEach((key) => {
            errorMap[key] = { type: "server", message: err[key].join(". ") };
        });
    } else {
        throw new Error(`something went wrong. need an object`);
    }

    // return errorMap;
    return Object.entries(errorMap).forEach((e) => setError(e[0], e[1]));
};

export default mapServerSideErrors;
