import React, { useState } from "react";
import { Stack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import CustomDatePicker from "../CustomDatePicker";
import CustomSelectShop from "../CustomSelectShop";

const ReportSummaryForm: React.FC<{}> = () => {
    let navigate = useNavigate();
    const [reportDate, setReportDate] = useState<Date | null>(null);
    const [storeId, setStoreId] = useState<string>();

    function handleSubmit() {
        let _storeId = storeId ? parseInt(storeId) : 0;
        let to = reportDate
            ? `/history/summary/${_storeId}/${format(
                  reportDate!,
                  "yyyy-MM-dd"
              )}`
            : "";

        navigate(to);
    }

    return (
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <Stack spacing={4} marginBottom={4}>
                <CustomSelectShop
                    onChange={(e) => setStoreId(e.target.value)}
                />
                <CustomDatePicker
                    onChange={(v) => setReportDate(v)}
                    selected={reportDate}
                    isClearable
                    placeholderText="Report Date"
                    maxDate={new Date()}
                    name="report_date"
                />

                <Button
                    disabled={!(reportDate && storeId)}
                    variant="solid"
                    type="submit"
                    loadingText="Please wait..."
                    colorScheme="teal"
                    onClick={handleSubmit}
                >
                    View Summary
                </Button>
            </Stack>
        </form>
    );
};

export default ReportSummaryForm;
