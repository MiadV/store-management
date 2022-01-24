import React, { forwardRef } from "react";
import { Select, SelectProps } from "@chakra-ui/react";
import { useAuthContext } from "../context/authContext";

const CustomSelectShop: React.ForwardRefRenderFunction<any, SelectProps> = (
    props,
    ref
) => {
    const { authUser } = useAuthContext();

    return (
        <Select placeholder="Select Shop" {...props} ref={ref}>
            {authUser?.shops?.map((i) => (
                <option value={i.shopId} key={i.shopId}>
                    {i.title}
                </option>
            ))}
        </Select>
    );
};

export default forwardRef(CustomSelectShop);
