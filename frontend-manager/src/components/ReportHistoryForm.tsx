import React, { useState } from "react";
import { Stack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import CustomDatePicker from "./CustomDatePicker";

const ReportHistoryForm: React.FC<{}> = () => {
    const [reportDate, setReportDate] = useState<Date | null>(null);

    return (
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <Stack spacing={4} marginBottom={4}>
                <CustomDatePicker
                    onChange={(v) => setReportDate(v)}
                    selected={reportDate}
                    isClearable
                    placeholderText="Report Date"
                    maxDate={new Date()}
                    name="report_date"
                />

                <Button
                    disabled={!reportDate}
                    variant="solid"
                    type="submit"
                    loadingText="Please wait..."
                    colorScheme="teal"
                    as={Link}
                    to={
                        reportDate
                            ? `/history/summary/${format(
                                  reportDate!,
                                  "yyyy-MM-dd"
                              )}`
                            : ""
                    }
                >
                    View Summary
                </Button>
            </Stack>
        </form>
    );
};

export default ReportHistoryForm;
